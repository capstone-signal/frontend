import { useState } from 'react'
import { useQuery } from 'react-query'
import { DiscussionResponse } from '../../api/Discussion'
import Spinner from '../Common/Spinner'

type Props = {
	discussion: DiscussionResponse
}
const ReviewList: React.FC<Props> = ({ discussion }) => {
	// get reviews using page query
	const [page, setPage] = useState<number>(1)
	const { data, error, isLoading } = useQuery(['reviews', discussion.id], () =>
		getReviews(discussion.id)
	)
	// infinite scroll
	return (
		<div>
			<h2>Reviews</h2>
			{isLoading && <Spinner />}
			{/* {error && <p>Error: {error.message}</p>} */}
			{/* {data && data.map(review => <ReviewDetail review={review} />)} */}
		</div>
	)
}

export default ReviewList

function getReviews(id: number): any {
	throw new Error('Function not implemented.')
}
