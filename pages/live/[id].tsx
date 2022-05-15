import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import { useEffect, useRef, useState } from 'react'
import { WebsocketProvider } from 'y-websocket'
import { getReviewByDiscussionId, ReviewResponse } from '../../api/Review'
import {
	getReviewReservationByDiscussionId,
	getReviewReservationById,
	ReviewReservationResponse
} from '../../api/ReviewReservation'
import * as Y from 'yjs'
import Editor from '@monaco-editor/react'
import * as monaco from 'monaco-editor'
import { extractCookie } from '../../api/User'
import jwt_decode from 'jwt-decode'
import Avatar from '../../components/Common/Avatar'
import dynamic from 'next/dynamic'
import { MarkdownPreviewProps } from '@uiw/react-markdown-preview'
import '@uiw/react-markdown-preview/markdown.css'
import { useUserId } from '../../hooks/useUserId'

type Props = {
	reservation: ReviewReservationResponse
	review: ReviewResponse
}

const MarkdownViewer = dynamic<MarkdownPreviewProps>(
	() => import('@uiw/react-markdown-preview'),
	{
		ssr: false
	}
)

const LiveSessionPage: NextPage<Props> = ({ review, reservation }) => {
	const [init, setInit] = useState<boolean>(false)
	const [isDefaultModalOpen, setDefaultModalOpen] = useState<boolean>(true)
	const [leftTime, setLeftTime] = useState<string>('00:00')
	const [selectedCode, setSelectedCode] = useState<number>(0)
	const { userId, isLoggedIn } = useUserId()
	const monacoRef = useRef<any>(null)
	const editorRef = useRef<any>(null)
	const handleEditorDidMount = (editor: any, monaco: any) => {
		editorRef.current = editor
		monacoRef.current = monaco
		setInit(true)
	}

	const completeReview = async () => {
		if (!confirm('정말로 완료하시겠습니까?')) return

		return null
	}

	useEffect(() => {
		// TODO : save code to server
		console.log('UPDATE')
	}, [selectedCode])

	useEffect(() => {
		if (!window) return
		const interval = setInterval(() => {
			const now = new Date()
			const left =
				new Date(reservation.reviewStartDateTime).getTime() +
				1000 * 60 * 60 -
				now.getTime()
			const leftTime = `${Math.floor(left / 1000 / 60)}:${Math.floor(
				(left / 1000) % 60
			)
				.toString()
				.padStart(2, '0')}`
			setLeftTime(leftTime)
		}, 1000)
		return () => {
			clearInterval(interval)
		}
	}, [reservation])

	useEffect(() => {
		if (!window) return
	}, [])

	useEffect(() => {
		if (!window) return
		if (!init) return
		if (!monacoRef.current) return
		if (!editorRef.current) return

		const ydoc = new Y.Doc()
		const provider = new WebsocketProvider(
			'ws://localhost:1235',
			`${reservation.id}?discussionCode=${selectedCode}`,
			ydoc
		)
		const ytext = ydoc.getText('test')

		const editor = editorRef.current

		const MonacoBinding = import('../../utils/y-monaco-wrapper').then((m) => {
			return new m.MonacoBinding(
				ytext,
				editor.getModel(),
				new Set([editor]),
				provider.awareness
			)
		})
	}, [review.id, init])

	return (
		<div className="live_review flex flex-col w-screen h-screen">
			<div className="live_review_header navbar bg-base-100 border-b-2 w-100 flex justify-between">
				<span>
					Live Review Session <span className="ml-4">{leftTime}</span>
					<span className="text-2xl ml-4">{reservation.discussion?.title}</span>
				</span>
				<div className="review_info">
					<label htmlFor="info-modal" className="btn modal-button">
						질문 정보 보기
					</label>
					<div className="ml-6">
						<Avatar
							username={reservation?.reviewer?.name ?? ''}
							activated={true}
						/>
					</div>
					<div className="mx-6">
						<Avatar
							username={reservation.discussion?.user.name ?? ''}
							activated={true}
						/>
					</div>
					{reservation.reviewer?.id === userId && (
						<div className="btn btn-error" onClick={completeReview}>
							종료
						</div>
					)}
				</div>
			</div>
			<div className="live_review_body flex h-full">
				<div className="discussion_info w-1/6">
					<ul className="menu menu-compact">
						{review.liveDiffList.map((diff, idx) => {
							return (
								<li
									className={`pl-4 py-4 cursor-pointer ${
										idx === selectedCode
											? 'bg-primary-focus'
											: 'hover:bg-neutral'
									}`}
									key={diff.id}
									onClick={() => setSelectedCode(idx)}
								>
									{diff.discussionCode.filename}
								</li>
							)
						})}
					</ul>
				</div>
				<div className="code w-5/6">
					<Editor
						language="typescript"
						options={{}}
						onMount={handleEditorDidMount}
					/>
				</div>
			</div>
			<input type="checkbox" id="info-modal" className="modal-toggle" />
			<div className="modal">
				<div className="modal-box">
					<MarkdownViewer
						source={reservation.discussion?.question ?? ''}
						style={{
							padding: '2rem',
							backgroundColor: '#000',
							border: '1px solid #eaeaea',
							borderRadius: '6px'
						}}
					/>

					<div className="modal-action">
						<label htmlFor="info-modal" className="btn btn-error">
							닫기
						</label>
					</div>
				</div>
			</div>
			<div className="init_modal">
				<input
					type="checkbox"
					id="init-modal"
					className="modal-toggle"
					checked={isDefaultModalOpen}
				/>
				<div className="modal">
					<div className="modal-box">
						<div className="content">비속어 ㄴㄴ</div>
						<div className="modal-action">
							<label
								htmlFor="init-modal"
								className="btn btn-error"
								onClick={() => {
									setDefaultModalOpen(false)
								}}
							>
								닫기
							</label>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export const getServerSideProps: GetServerSideProps<Props> = async (
	ctx: GetServerSidePropsContext
) => {
	const reservationId = parseInt(ctx.params?.id as string)
	if (isNaN(reservationId)) {
		throw new Error('Invalid reservation id')
	}

	const reviewReservation = (await getReviewReservationByDiscussionId(7100))[0] //await getReviewReservationById(reservationId)
	if (!reviewReservation) {
		throw new Error('Reservation id not found')
	}

	if (reviewReservation.isdone) {
		throw new Error('Review is done')
	}

	const now = new Date()
	const reviewStartTime = new Date(reviewReservation.reviewStartDateTime)
	if (now < reviewStartTime) {
		throw new Error('Review not started yet')
	}
	if (now > new Date(reviewStartTime.getTime() + 1000 * 60 * 60)) {
		throw new Error('Review has ended')
	}

	// validation 2
	const cookie = ctx.req?.headers?.cookie
	if (!cookie) {
		throw new Error('No cookie')
	}
	// get client's cookie -> user id)
	const accessToken = extractCookie(cookie, 'accessToken')
	if (!accessToken) {
		throw new Error('No access token')
	}

	const user = jwt_decode(accessToken) as { userId: string } // TODO : validation jwt

	const revieweeId = reviewReservation?.discussion?.user?.id
	const reviewerId = reviewReservation?.reviewer?.id
	const userId = parseInt(user.userId, 10)

	if (userId !== revieweeId && userId !== reviewerId) {
		throw new Error('User not allowed')
	}

	const reviews = await getReviewByDiscussionId(7100, 0) // todo : get review by review_reservation id
	return {
		props: {
			review: reviews.content[1],
			reservation: reviewReservation
		}
	}
}
export default LiveSessionPage
