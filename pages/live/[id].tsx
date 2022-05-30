/* eslint-disable indent */
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import { useEffect, useRef, useState } from 'react'
import { WebsocketProvider } from 'y-websocket'
import {
	completeLiveReview,
	LiveReviewDiffResponse,
	participateLiveReview,
	ReviewResponse,
	updateLiveReviewDiff
} from '../../api/Review'
import {
	getReviewReservationById,
	ReviewReservationResponse
} from '../../api/ReviewReservation'
import * as Y from 'yjs'
import Editor from '@monaco-editor/react'
import { extractCookie } from '../../api/User'
import jwt_decode from 'jwt-decode'
import Avatar from '../../components/Common/Avatar'
import dynamic from 'next/dynamic'
import { MarkdownPreviewProps } from '@uiw/react-markdown-preview'
import '@uiw/react-markdown-preview/markdown.css'
import { useUserId } from '../../hooks/useUserId'
import apiConfig from '../../config/apiConfig'
import { MonacoBinding } from '../../utils/y-monaco-wrapper'
import { useRouter } from 'next/router'
import {
	DiscussionCodeResponse,
	DiscussionResponse,
	getDiscussionById
} from '../../api/Discussion'

type Props = {
	reservation: ReviewReservationResponse
	review: ReviewResponse
	discussion: DiscussionResponse
	codes: DiscussionCodeResponse[]
}

const MarkdownViewer = dynamic<MarkdownPreviewProps>(
	() => import('@uiw/react-markdown-preview'),
	{
		ssr: false
	}
)

const DIFF_UPDATE_INTERVAL = 5000
const LiveSessionPage: NextPage<Props> = ({
	review,
	reservation,
	discussion,
	codes
}) => {
	const router = useRouter()
	const [init, setInit] = useState<boolean>(false)
	const [initialDiffs, setInitialDiffs] = useState<LiveReviewDiffResponse[]>([])
	const [isWsLoaded, setIsWsLoaded] = useState<boolean>(false)
	const [isDefaultModalOpen, setDefaultModalOpen] = useState<boolean>(true)
	const [leftTime, setLeftTime] = useState<string>('00:00')
	const [selectedCode, setSelectedCode] = useState<number>(0)
	const { userId, isLoggedIn } = useUserId()
	const monacoRef = useRef<any>(null)
	const editorRef = useRef<any>(null)
	const bindingRef = useRef<MonacoBinding | null>(null)
	const wsRef = useRef<any>(null)

	const handleEditorDidMount = (editor: any, monaco: any) => {
		editorRef.current = editor
		monacoRef.current = monaco
		setInit(true)
	}

	const completeReview = async () => {
		if (!confirm('정말로 완료하시겠습니까?')) return
		try {
			const res = await completeLiveReview(reservation.id)
			window.location.href = `/discussion/${discussion.id}`
		} catch (e) {
			console.error(e)
			alert('오류가 발생했습니다. 잠시 후 다시 시도해주세요.') // TODO
		}
		return null
	}

	const initializeSession = async (reservationId: number, reviewId: number) => {
		try {
			await participateLiveReview(reservationId)
			// const diffs = await getReviewDiffsByReviewId(reviewId)
			// setInitialDiffs(diffs)
		} catch (e) {
			console.error(e)
			alert('초기화에 실패했습니다.')
			window.location.reload()
		}
	}

	// initilize
	useEffect(() => {
		if (!window) return
		initializeSession(reservation.id, review.id)
	}, [reservation.id, review.id])

	// timer ui
	useEffect(() => {
		if (!window) return

		const completeHandler = async () => {
			await updateLiveReviewDiff(review.liveDiffList[selectedCode].id, {
				codeAfter: editorRef.current?.getModel().getValue()
			})
			window.location.href = `/discussion/${discussion.id}`
		}
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
			if (left <= 0) {
				completeHandler()
			}
		}, 1000)
		return () => {
			clearInterval(interval)
		}
	}, [reservation, selectedCode])

	// periodic update diff
	useEffect(() => {
		// const interval = setInterval(() => {
		// 	if (!bindingRef.current) {
		// 		return
		// 	}
		// 	if (!isWsLoaded) {
		// 		return
		// 	}
		// 	const binding = bindingRef.current
		// 	const codeAfter = binding.ytext.toString()
		// 	if (codeAfter === '') {
		// 		// invalid code 판단
		// 		return
		// 	}
		// 	const diffId = review.liveDiffList[selectedCode].id
		// 	updateLiveReviewDiff(diffId, {
		// 		codeAfter
		// 	})
		// }, DIFF_UPDATE_INTERVAL)

		// return () => {
		// 	clearInterval(interval)
		// }
	}, [isWsLoaded, review.liveDiffList, selectedCode])

	// Update Websocket Binding
	useEffect(() => {
		if (!window) return
		if (!init) return
		if (!monacoRef.current) return
		if (!editorRef.current) return
		const ydoc = new Y.Doc()
		const diffId = review.liveDiffList[selectedCode].id
		const roomName = `${reservation.id}?reviewDiff=${diffId}`
		if (wsRef.current && bindingRef.current) {
			bindingRef.current.destroy()
		}
		const ws = new WebsocketProvider(apiConfig.websocketUrl, roomName, ydoc, {
			connect: false
		})
		wsRef.current = ws
		const ytext = ydoc.getText(roomName)

		ws.on('sync', (isSync: boolean) => {
			console.log('sync', ytext.toString())
		})

		ws.on('connection-close', (event: CloseEvent) => {
			const REVIEW_COMPLETE_CODE = 3999
			setIsWsLoaded(false)
			updateLiveReviewDiff(diffId, {
				codeAfter: ytext.toString()
			})
			switch (event.code) {
				case 1000:
					// normal close
					break
				case REVIEW_COMPLETE_CODE:
					alert('리뷰 시간이 종료되었습니다.')
					window.location.href = `/discussion/${discussion.id}`
					break
				default:
					alert('오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
					window.location.reload()
					break
			}
		})

		ws.on('connection-error', (err: any) => {
			console.error(err)
			alert('오류가 발생했습니다. 잠시 후 다시 시도해주세요.') // TODO
			window.location.href = '/'
		})

		ws.on('status', ({ status }: { status: string }) => {
			if (status === 'connected') {
				const editor = editorRef.current
				import('../../utils/y-monaco-wrapper').then((m) => {
					const binding = new m.MonacoBinding(
						ytext,
						editor.getModel(),
						new Set([editor]),
						ws.awareness
					)
					bindingRef.current = binding
					setIsWsLoaded(true)
				})
			}
		})
		ws.connect()
	}, [discussion.id, init, reservation.id, review.liveDiffList, selectedCode])

	useEffect(() => {
		// TODO : 보이스 연결
	}, [])

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
									{codes.find((c) => c.id === diff.discussionCode)?.filename}
								</li>
							)
						})}
					</ul>
				</div>
				<div className={`code w-5/6 ${isWsLoaded ? '' : 'hidden'}`}>
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

	const reviewReservation = await getReviewReservationById(reservationId)
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

	const discussion = await getDiscussionById(
		reviewReservation?.discussion?.id || 0
	) // TODO : validation discussion

	const review = reviewReservation?.review
	if (!review) {
		throw new Error('No review')
	}
	return {
		props: {
			review,
			reservation: reviewReservation,
			discussion: discussion.discussion,
			codes: discussion.codes
		}
	}
}
export default LiveSessionPage
