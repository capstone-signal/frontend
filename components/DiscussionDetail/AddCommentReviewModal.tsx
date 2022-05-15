import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { useUserId } from '../../hooks/useUserId'

const Editor = dynamic(() => import('@monaco-editor/react'), {
	ssr: false
})

interface Props {
	newCode: string
	language: string
	setNewCode: (value: string) => void
	handleReviewAdd: (codeAfter: string, comment: string) => void
}
const AddCommentReviewModal: React.FC<Props> = ({
	newCode,
	language,
	setNewCode,
	handleReviewAdd
}) => {
	const [comment, setComment] = useState<string>('')
	const { init, isLoggedIn } = useUserId()

	useEffect(() => {
		if (!init) {
			return
		}
	}, [init])
	return (
		<div className="modal-box">
			{isLoggedIn ? (
				<div className="flex flex-col">
					<div className="font-bold text-lg">Add a comment review</div>
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
						className="input input-bordered w-full max-w-[40rem] m-2"
						value={comment}
						onChange={(e) => setComment(e.target.value)}
					/>
					<div className="modal-action">
						<label
							htmlFor="addCommentReview"
							className="btn"
							onClick={() => {
								handleReviewAdd(newCode, comment)
								setComment('')
							}}
						>
							Add
						</label>
						<label
							htmlFor="addCommentReview"
							className="btn"
							onClick={() => setComment('')}
						>
							Cancel
						</label>
					</div>
				</div>
			) : (
				<>
					<div>로그인이 필요한 서비스입니다.</div>
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
