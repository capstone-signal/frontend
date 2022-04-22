import { LiveReviewAvailableTime } from '../../api/Discussion'
import TimeSelectComponent from './TimeSelectComponent'
import { DateField, Hours } from './TodayTo3Days'

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
											time={hour}
											liveReviewAvailableTimes={liveReviewAvailableTimes}
											setLiveReviewAvailableTimes={setLiveReviewAvailableTimes}
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
						<a href="#" className="btn">
							Close
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LiveReviewCalendar
