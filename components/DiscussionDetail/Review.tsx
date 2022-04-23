import { useState } from 'react'
import { useQuery } from 'react-query'
import { ReviewResponse } from '../../api/Review'

type Props = {
	review: ReviewResponse
}

const ReviewDetail: React.FC<Props> = ({ review }) => {
	const [isToggled, setToggled] = useState<boolean>(false)
	const { data, error, isLoading } = useQuery(
		['reviewDetail', review.id],
		() => {
			return null
		}
	)
	// toggled , then hide the review detail
	// if not toggled, get the review thread & detail
	return <div></div>
}

export default ReviewDetail
