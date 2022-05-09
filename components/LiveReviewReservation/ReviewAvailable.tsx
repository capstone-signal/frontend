import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import {
	getMyAvailableReservations,
	ReviewReservationResponse
} from '../../api/ReviewReservation'
import Spinner from '../Common/Spinner'

const ReviewAvailable: React.FC = () => {
	const router = useRouter()
	const { data, isLoading, isError } = useQuery<ReviewReservationResponse[]>(
		['reviewAvailable'],
		() => getMyAvailableReservations()
	)

	const enterSession = (reservations: ReviewReservationResponse[]) => {
		const session = findProperReservation(reservations)
		if (session) {
			router.push(`/live/${session.id}`)
		}
	}

	if (isLoading) return <Spinner />
	if (isError) return <div>error</div>

	return (
		<div>
			{data && data.length > 0 ? (
				<div
					className="btn btn-secondary cursor-pointer mr-6"
					onClick={() => enterSession(data)}
				>
					Review 입장
				</div>
			) : null}
		</div>
	)
}

export default ReviewAvailable
function findProperReservation(reservations: ReviewReservationResponse[]) {
	const sorted = reservations.sort((a, b) => {
		return (
			new Date(a.reviewStartDateTime).getTime() -
			new Date(b.reviewStartDateTime).getTime()
		)
	})
	return sorted[sorted.length - 1]
}
