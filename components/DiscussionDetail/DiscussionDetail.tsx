import {
	completeDiscussion,
	deleteDiscussion,
	DiscussionCodeResponse,
	DiscussionResponse,
	DiscussionState
} from '../../api/Discussion'
import { MarkdownPreviewProps } from '@uiw/react-markdown-preview'
import dayjs from 'dayjs'
import '@uiw/react-markdown-preview/markdown.css'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import LiveReviewReservationModal from '../LiveReviewReservation/LiveReviewReservationModal'
import { useUserId } from '../../hooks/useUserId'
import CommentReviewStore from '../createReview/CommentReivewStore'
import { CommentReviewDiff, createReview } from '../../api/Review'

type Props = {
	discussion: DiscussionResponse
	codes: DiscussionCodeResponse[]
	selectedReviewIds: number[]
	isCompletePhase: boolean
	handleClickCompletePhase: () => void
}

dayjs.locale('ko')
const MarkdownViewer = dynamic<MarkdownPreviewProps>(
	() => import('@uiw/react-markdown-preview'),
	{
		ssr: false
	}
)

const DiscussionCode = dynamic(() => import('../createReview/DiscussionCode'), {
	ssr: false
})

const questionMarkdownViewerStyle: React.CSSProperties = {
	padding: '2rem',
	backgroundColor: 'transparent',
	border: '1px solid #eaeaea',
	borderRadius: '6px'
}

const DiscussionDetail: React.FC<Props> = ({
	discussion,
	codes,
	selectedReviewIds,
	isCompletePhase,
	handleClickCompletePhase
}) => {
	const { userId, isLoggedIn } = useUserId()
	const [selectedCode, setSelectedCode] = useState<number>(0)
	const [newReviewList, setNewReviewList] = useState<CommentReviewDiff[]>([])
	const isDiscussionOwner = discussion.user.id === userId

	const handleClickCode = (index: number) => {
		setSelectedCode(index)
	}

	const handleClickDelete = async () => {
		try {
			await deleteDiscussion(discussion.id)
			alert('삭제되었습니다.')
			window.location.href = '/list'
		} catch (e) {
			console.error(e)
			// TODO : 에러 분기
			alert('삭제에 실패했습니다.\n리뷰가 존재하는 경우 삭제할 수 없습니다.')
		}
	}

	const liveReviewAvailable = (discussion: DiscussionResponse) => {
		const cond1 = discussion.liveReviewRequired
		const cond2 = !isDiscussionOwner
		const cond3 = isLoggedIn
		return cond1 && cond2 && cond3
	}

	const createNewReview = async () => {
		const data = {
			diffList: newReviewList,
			discussionId: discussion.id
		}
		if (newReviewList.length == 0) {
			alert('리뷰 내용이 없습니다.')
			return
		}
		try {
			await createReview(data)
			alert('리뷰 작성이 완료되었습니다.')
			setNewReviewList([])
		} catch (e) {
			console.error(e)
			alert("can't create review.")
		}
	}

	const handleStartComplete = () => {
		alert('채택할 리뷰를 선택해주세요.')
		handleClickCompletePhase()
		return
	}

	const handleClickComplete = async () => {
		if (selectedReviewIds.length == 0) {
			alert('채택할 리뷰를 1개 이상 선택해주세요.')
			return
		}

		try {
			await completeDiscussion(discussion.id) // TODO : selectedReviews 바디에 추가
			alert('완료되었습니다.')
			window.location.reload()
		} catch (e) {
			console.error(e)
			alert('완료에 실패했습니다.')
		}
		return
	}

	return (
		<div>
			<div className="dd_header">
				<h1 className="text-4xl">{discussion.title}</h1>
				<div className="flex items-center justify-between">
					<div className="avatar placeholder flex items-center my-4">
						<div className="bg-neutral-focus text-neutral-content rounded-full w-8">
							<span className="text-2xl">{discussion.user.name[0]}</span>
						</div>
						<span className="text ml-3">{discussion.user.name}</span>
					</div>
					<span className="text">
						<span className="created_at mr-6">
							{dayjs(discussion.createdAt).format('YYYY/MM/DD hh:mm A')}
						</span>
						{isDiscussionOwner && (
							<span className="btn btn-error" onClick={handleClickDelete}>
								삭제
							</span>
						)}
						{isDiscussionOwner &&
							discussion.state === DiscussionState.REVIEWING && (
								<span
								className="btn btn-primary ml-2"
								onClick={
									isCompletePhase ? handleClickComplete : handleStartComplete
									}
							>
								{isCompletePhase ? '선택 완료' : '완료'}
								</span>
							)}
					</span>
				</div>
				<div className="tags mb-4">
					{discussion.tags?.map((tag) => (
						<div className="badge badge-info badge-lg mx-1" key={tag.id}>
							{tag.name}
						</div>
					))}
				</div>
			</div>
			<div className="dd_question">
				<MarkdownViewer
					source={discussion.question}
					style={questionMarkdownViewerStyle}
				/>
			</div>
			<div className="dd_codes flex flex-row mt-10 mr-6">
				<div className="files_nav basis-1/6 w-1/4">
					<div className="files_nav_header">
						<div className="p-4 text-xl border-2 rounded-tl-2xl border-gray-600">
							Files
						</div>
						<ul className="menu menu-compact max-h-[32rem] overflow-y-scroll">
							{codes.map((code, idx) => {
								return (
									<li
										className={`pl-4 py-4 cursor-pointer ${
											idx === selectedCode
												? 'bg-primary-focus'
												: 'hover:bg-neutral'
										}`}
										key={code.id}
										onClick={() => handleClickCode(idx)}
									>
										{code.filename}
									</li>
								)
							})}
						</ul>
					</div>
				</div>
				<div className="codes basis-5/6 w-3/4">
					<div className="codes_header flex flex-row">
						<div className="p-4 text-2xl border-2 text-xl basis-1/5 rounded-tr-2xl border-gray-600">
							Codes
						</div>
					</div>
					<div className="selected_code">
						<DiscussionCode
							reviewee={discussion.user.id}
							discussionCode={codes[selectedCode]}
							newReviewList={newReviewList}
							setNewReviewList={setNewReviewList}
						/>
					</div>
				</div>
				<CommentReviewStore
					newReviewList={newReviewList}
					setNewReviewList={setNewReviewList}
					createNewReview={createNewReview}
				/>
			</div>
			<div className="dd_live_review_box flex justify-center">
				<a
					href="#live_review_reservation"
					className={`btn mt-6 ${
						liveReviewAvailable(discussion) ? 'btn-primary' : 'btn-disabled'
					}`}
				>
					라이브 리뷰 예약
				</a>
			</div>
			{liveReviewAvailable(discussion) && (
				<div className="modal" id="live_review_reservation">
					<LiveReviewReservationModal discussion={discussion} />
				</div>
			)}
		</div>
	)
}

export default DiscussionDetail
