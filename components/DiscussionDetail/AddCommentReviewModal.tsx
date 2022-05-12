import { useState } from 'react'

interface Props {
	newCode: string
	setNewCode: (value: string) => void
}
const AddCommentReviewModal: React.FC<Props> = ({ newCode, setNewCode }) => {
	const [comment, setComment] = useState<string>('')
	return (
		<div className="modal-box">
			<div className="flex flex-col">
				<div className="font-bold text-lg">Add a comment review</div>
				<input
					type="text"
					className="input input-bordered w-full max-w-[40rem] m-2"
					value={newCode}
					onChange={(e) => setNewCode(e.target.value)}
				/>
				<input
					type="text"
					placeholder="comment를 작성하세요"
					className="input input-bordered w-full max-w-[40rem] m-2"
					value={comment}
					onChange={(e) => setComment(e.target.value)}
				/>
				<div className="modal-action">
					<a href="#" className="btn">
						Add
					</a>
					<a href="#" className="btn">
						Cancel
					</a>
				</div>
			</div>
		</div>
	)
}

export default AddCommentReviewModal
