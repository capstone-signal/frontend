import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { useUserId } from '../../hooks/useUserId'

const Editor = dynamic(() => import('@monaco-editor/react'), {
	ssr: false
})

interface Props {
	reviewee: number
	newCode: string
	language: string
	setNewCode: (value: string) => void
	handleReviewAdd: (codeAfter: string, comment: string) => void
}
const AddCommentReviewModal: React.FC<Props> = ({
	reviewee,
	newCode,
	language,
	setNewCode,
	handleReviewAdd
}) => {
	const [comment, setComment] = useState<string>('')
	const { isLoggedIn, userId } = useUserId()
	const qualified = reviewee !== userId && isLoggedIn

	return (
		<div className="modal-box">
			{qualified ? (
				<div className="flex flex-col">
					<div className="font-bold text-lg mb-3">코드를 리뷰하세요!</div>
					<Editor
						height="10rem"
						language={language}
						value={newCode}
						// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
						onChange={(value?: string) => setNewCode(value!)}
					/>
					<input
						type="text"
						placeholder="comment를 작성하세요"
						className="input input-bordered w-full max-w-[40rem] mt-3"
						value={comment}
						onChange={(e) => setComment(e.target.value)}
					/>
					<div className="modal-action mt-3">
						<label
							htmlFor="addCommentReview"
							className="btn btn-success"
							onClick={() => {
								handleReviewAdd(newCode, comment)
								setComment('')
							}}
						>
							추 가
						</label>
						<label
							htmlFor="addCommentReview"
							className="btn btn-error"
							onClick={() => setComment('')}
						>
							취 소
						</label>
					</div>
				</div>
			) : (
				<>
					<div>권한이 없는 서비스입니다.</div>
					<div className="modal-action">
						<label htmlFor="addCommentReview" className="btn">
							확인
						</label>
					</div>
				</>
			)}
		</div>
	)
}

export default AddCommentReviewModal
