import { useState } from 'react'
import { CommentReviewDiff } from '../../api/Review'

interface Props {
	newReviewList: CommentReviewDiff[]
}
const CommentReviewStore: React.FC<Props> = ({ newReviewList }) => {
	const [activate, setActivate] = useState<boolean>(false)
	return (
		<>
			{activate ? (
				<div className="fixed bg-purple-500 right-[5vw] bottom-[10vh] h-[30rem] w-[20rem] rounded-2xl p-2">
					<div className="flex flex-row justify-between items-center">
						<div className="font-bold ml-2">New Review Storage</div>
						<button
							className="btn btn-sm btn-ghost p-2"
							onClick={() => setActivate(false)}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-4 w-4"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="3"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>
					<div className="w-full p-2">
						<div className="bg-fuchsia-50 w-full h-[26rem] rounded-xl">
							{newReviewList.map((review, idx) => {
								return (
									<div key={idx}>
										<div>{review.codeAfter}</div>
										<div>{review.comment}</div>
									</div>
								)
							})}
						</div>
					</div>
				</div>
			) : (
				<button
					className="btn fixed bg-purple-500 right-[5vw] bottom-[10vh] normal-case"
					onClick={() => setActivate(true)}
				>
					Review Storage
				</button>
			)}
		</>
	)
}

export default CommentReviewStore
