import LiveReviewCalendar from '../LiveReviewReservation/LiveReviewCalendar'

const ReceiveLiveReview = ({
	liveReviewRequired,
	setLiveReviewRequired,
	liveReviewAvailableTimes,
	setLiveReviewAvailableTimes
}: {
	liveReviewRequired: any
	setLiveReviewRequired: any
	liveReviewAvailableTimes: any
	setLiveReviewAvailableTimes: any
}) => {
	const clickLiveReviewCheck = () => {
		setLiveReviewRequired(!liveReviewRequired)
	}

	return (
		<div className="flex flex-col items-center m-2">
			<div className="text-xl mb-2 ml-4">
				리뷰어와 더 원활하게 소통할 수 있는 Live Review는 어떠신가요?
			</div>
			<div className="flex items-center">
				<input
					type="checkbox"
					className="checkbox mr-2"
					onClick={clickLiveReviewCheck}
					checked={liveReviewRequired}
				/>
				<p className="mr-2">Live Review</p>
				<LiveReviewCalendar
					liveReviewRequired={liveReviewRequired}
					liveReviewAvailableTimes={liveReviewAvailableTimes}
					setLiveReviewAvailableTimes={setLiveReviewAvailableTimes}
				/>
			</div>
		</div>
	)
}

export default ReceiveLiveReview
