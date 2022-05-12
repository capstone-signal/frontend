import { CommentReviewDiff } from '../../api/Review'

interface Props {
	newReviewList: CommentReviewDiff[]
}
const CommentReviewStore: React.FC<Props> = ({ newReviewList }) => {
	return (
		<div>
			<div>New Review Storage</div>
			{newReviewList.map((review, idx) => {
				return (
					<div key={idx}>
						<div>{review.codeAfter}</div>
						<div>{review.comment}</div>
					</div>
				)
			})}
		</div>
	)
}

export default CommentReviewStore
