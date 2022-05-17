import { useState } from 'react'
import { CommentReviewDiff } from '../../api/Review'
import Closure from '../Common/Closure'

interface Props {
	newReviewList: CommentReviewDiff[]
	setNewReviewList: (value: CommentReviewDiff[]) => void
	createNewReview: () => void
}
const CommentReviewStore: React.FC<Props> = ({
	newReviewList,
	setNewReviewList,
	createNewReview
}) => {
	const [activate, setActivate] = useState<boolean>(false)
	const handleRemoveReview = (review: CommentReviewDiff) => {
		setNewReviewList(newReviewList.filter((diff) => diff !== review))
	}
	return (
		<>
			{activate ? (
				<div className="fixed bg-purple-500 right-[5vw] bottom-[10vh] h-[30rem] w-[20rem] rounded-2xl p-2">
					<div className="flex flex-row justify-between items-center">
						<div className="font-bold ml-2">리뷰 스토리지</div>
						<button
							className="btn btn-sm btn-ghost p-2"
							onClick={() => setActivate(false)}
						>
							<Closure />
						</button>
					</div>
					<div className="flex flex-col w-full p-2 items-end">
						<div className="bg-fuchsia-50 w-full h-[24rem] rounded-xl p-2 overflow-y-scroll">
							{newReviewList.map((review, idx) => {
								return (
									<div
										key={idx}
										className="flex flex-row justify-between mb-2"
										id={`${idx}`}
									>
										<div className="rounded-xl border-2 border-solid border-gray-300 w-[90%] pl-2 overflow-hidden whitespace-nowrap overflow-ellipsis">
											{idx + 1}.&nbsp;{review.discussionCode.filename}:&nbsp;
											{review.codeLocate[0]}-{review.codeLocate[1]}
										</div>
										<label
											htmlFor={`removeCheck_${idx}`}
											className="flex cursor-pointer items-center"
										>
											<Closure />
										</label>
										<input
											type="checkbox"
											id={`removeCheck_${idx}`}
											className="modal-toggle"
										/>
										<div className="modal">
											<div className="modal-box">
												<div>정말 삭제하시겠습니까?</div>
												<div className="modal-action">
													<label
														htmlFor={`removeCheck_${idx}`}
														className="btn btn-success"
														onClick={() => handleRemoveReview(review)}
													>
														확인
													</label>
													<label
														htmlFor={`removeCheck_${idx}`}
														className="btn btn-error"
													>
														취소
													</label>
												</div>
											</div>
										</div>
									</div>
								)
							})}
						</div>
						<label
							htmlFor="upload_review"
							className="btn btn-success btn-sm mt-2 w-[8rem]"
						>
							리뷰 업로드
						</label>
						<input
							type="checkbox"
							id="upload_review"
							className="modal-toggle"
						/>
						<div className="modal">
							<div className="modal-box">
								<div>리뷰 작성을 완료하시겠습니까?</div>
								<div className="modal-action">
									<label
										htmlFor="upload_review"
										className="btn btn-success"
										onClick={() => {
											createNewReview()
											setActivate(false)
										}}
									>
										확인
									</label>
									<label htmlFor="upload_review" className="btn btn-error">
										취소
									</label>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<button
					className="btn fixed bg-purple-500 right-[5vw] bottom-[10vh] normal-case w-[10rem]"
					onClick={() => setActivate(true)}
				>
					리뷰 스토리지 ( {newReviewList.length} )
				</button>
			)}
		</>
	)
}

export default CommentReviewStore
