import dynamic from 'next/dynamic'
import { useState } from 'react'

const Editor = dynamic(() => import('@monaco-editor/react'), {
	ssr: false
})

interface Props {
	newCode: string
	setNewCode: (value: string) => void
	handleReviewAdd: (codeAfter: string, comment: string) => void
}
const AddCommentReviewModal: React.FC<Props> = ({
	newCode,
	setNewCode,
	handleReviewAdd
}) => {
	const [comment, setComment] = useState<string>('')
	return (
		<div className="modal-box">
			<div className="flex flex-col">
				<div className="font-bold text-lg">Add a comment review</div>
				<Editor
					height="10rem"
					defaultLanguage="javascript"
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
					{/*<a href="#" className="btn" onClick={() => AddCommentReview()}>*/}
					<label
						htmlFor="addCommentReview"
						className="btn"
						onClick={() => handleReviewAdd(newCode, comment)}
					>
						Add
					</label>
					<label htmlFor="addCommentReview" className="btn">
						Cancel
					</label>
				</div>
			</div>
		</div>
	)
}

export default AddCommentReviewModal
