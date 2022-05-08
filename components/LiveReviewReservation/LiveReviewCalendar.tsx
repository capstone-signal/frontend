import { LiveReviewAvailableTime } from '../../api/Discussion'
import TimeSelectComponent from './TimeSelectComponent'
import { DateField, Hours } from '../../variables/TodayTo3DaysAndTime'

type Props = {
	liveReviewRequired: boolean
	liveReviewAvailableTimes: LiveReviewAvailableTime[]
	setLiveReviewAvailableTimes: (value: LiveReviewAvailableTime[]) => void
}

const LiveReviewCalendar: React.FunctionComponent<Props> = ({
	liveReviewRequired,
	liveReviewAvailableTimes,
	setLiveReviewAvailableTimes
}) => {
	const addAvailableTime = (start: Date, end: Date) => {
		setLiveReviewAvailableTimes([
			...liveReviewAvailableTimes,
			{ start: start, end: end }
		])
	}
	const removeAvailableTime = (start: Date) => {
		setLiveReviewAvailableTimes(
			liveReviewAvailableTimes.filter(
				(availableTime) => availableTime.start.getTime() !== start.getTime()
			)
		)
	}
	return (
		<div>
			{liveReviewRequired && (
				<a href="#liveReviewModal" className="btn modal-button">
					Live Review Picker
				</a>
			)}
			{!liveReviewRequired && (
				<a href="#liveReviewModal" className="btn modal-button btn-disabled">
					Live Review Picker
				</a>
			)}
			<div className="modal" id="liveReviewModal">
				<div className="modal-box">
					<div className="flex flex-row w-full border-solid border-2 rounded">
						{DateField.map((date: Date, idx: number) => (
							<div key={idx} className="w-1/4">
								<div className="date text-center">
									{date.getMonth() + 1 + '-' + date.getDate()}
								</div>
								<div className="flex flex-col">
									{Hours.map((hour) => (
										<TimeSelectComponent
											key={hour}
											date={date}
											hour={hour}
											addAvailableTime={addAvailableTime}
											removeAvailableTime={removeAvailableTime}
										/>
									))}
								</div>
							</div>
						))}
					</div>
					<div>
						<a href="#" className="btn btn-primary">
							Accept
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LiveReviewCalendar
