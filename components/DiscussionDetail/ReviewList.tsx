import { useState } from 'react'
import { useQuery } from 'react-query'
import { DiscussionResponse } from '../../api/Discussion'
import { getReviewByDiscussionId } from '../../api/Review'
import Spinner from '../Common/Spinner'
import ReviewDetail from './Review'

type Props = {
	discussion: DiscussionResponse
}
const ReviewList: React.FC<Props> = ({ discussion }) => {
	// get reviews using page query
	const [page, setPage] = useState<number>(0)
	const { isLoading, isError, error, data, isFetching, isPreviousData } =
		useQuery(
			['reviews', page, discussion.id],
			() => getReviewByDiscussionId(discussion.id, page),
			{
				keepPreviousData: true
			}
		)

	if (isLoading) return <Spinner />
	if (isError) return <div>Error</div>

	// infinite scroll
	return (
		<div className="border-t-2 my-10">
			{data?.content.map((review) => {
				return <ReviewDetail review={review} key={review.id} />
			})}
		</div>
	)
}

export default ReviewList
