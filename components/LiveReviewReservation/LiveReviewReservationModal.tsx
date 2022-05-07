import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import {
	DiscussionResponse,
	LiveReviewAvailableTime
} from '../../api/Discussion'
import {
	createReviewReservation,
	getReviewReservationByDiscussionId
} from '../../api/ReviewReservation'
import Spinner from '../Common/Spinner'

type AvailableDays = {
	[key: string]: LiveReviewAvailableTime[]
}
type Props = {
	discussion: DiscussionResponse
}

const INTERVAL_TIME_IN_MILLISECONDS = 1000 * 60 * 5
const HOUR_IN_MILLISECONDS = 1000 * 60 * 60

dayjs.locale('ko')
const LiveReviewReservationModal: React.FC<Props> = ({ discussion }) => {
	const [availableDays, setAvailableDays] = useState<AvailableDays>({})
	const [loading, setLoading] = useState(false)
	const { data, isLoading, error } = useQuery(
		/* TODO : only fetch modal is open */
		['reviewReservations', discussion.id],
		() => getReviewReservationByDiscussionId(discussion.id)
	)

	const createReservation = async (reviewStartDateTime: Date) => {
		if (loading) return
		setLoading(true)
		try {
			await createReviewReservation({
				reviewStartDateTime,
				discussionId: discussion.id
			})
			alert('예약이 완료되었습니다.\n메일을 확인해주세요.')
		} catch (e) {
			console.log(e)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		const newAvailableDays: AvailableDays = {}
		discussion.liveReviewAvailableTimes.times.forEach((availableTime) => {
			if (availableTime.end < new Date()) return // filter out past time
			const date = dayjs(availableTime.start).format('M/D(ddd)')
			if (!newAvailableDays[date]) {
				newAvailableDays[date] = [availableTime]
			} else {
				newAvailableDays[date].push(availableTime)
			}
		})
		setAvailableDays(newAvailableDays)
	}, [discussion])

	if (isLoading) return <Spinner />
	if (error) return <div>Error</div>
	return (
		<div className="modal-box">
			<div className="flex justify-end">
				<a href="#" className="btn btn-error mb-2 ">
					Close
				</a>
			</div>
			<div className="flex flex-row w-full border-solid border-2 rounded">
				{Object.keys(availableDays).map((key: string, idx: number) => {
					const availableStartTimes: Date[] = []
					availableDays[key].forEach(({ start, end }, idx) => {
						const lastStartTime = new Date(
							new Date(end).getTime() - HOUR_IN_MILLISECONDS
						)
						let startTime = new Date(start)
						while (startTime.getTime() <= lastStartTime.getTime()) {
							// check if already reserved time
							const reserved = data?.find((reservation) => {
								const reviewDate = new Date(reservation.reviewStartDateTime)
								return (
									Math.abs(reviewDate.getTime() - startTime.getTime()) <=
									HOUR_IN_MILLISECONDS
								)
							})
							if (!reserved) {
								availableStartTimes.push(startTime)
							}
							startTime = new Date(
								startTime.getTime() + INTERVAL_TIME_IN_MILLISECONDS
							)
						}
					})

					availableStartTimes.sort((a, b) => a.getTime() - b.getTime()) // sort by time
					return (
						<div key={idx} className="w-1/4 m-2">
							<div>
								<div className="date text-center">{key}</div>
								<div className="flex flex-col">
									{availableStartTimes.map((date) => {
										return (
											<div
												key={date.getTime()}
												className={`btn w-full btn-primary m-2`}
												onClick={() => createReservation(date)}
											>
												{dayjs(date).format('HH:mm')}
											</div>
										)
									})}
								</div>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default LiveReviewReservationModal
