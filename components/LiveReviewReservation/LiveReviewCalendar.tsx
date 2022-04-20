import { LiveReviewAvailableTime } from '../../api/Discussion'
import TimeSelectComponent from './TimeSelectComponent'

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
	const today = new Date()
	const dateField: Date[] = [today, today, today, today]
	for (let i = 1; i < 4; i++) {
		const nextDate = new Date()
		nextDate.setDate(today.getDate() + i)
		dateField[i] = nextDate
	}
	const dates: string[] = ['', '', '', '']
	for (let i = 0; i < 4; i++) {
		dates[i] = dateField[i].getMonth() + 1 + '-' + dateField[i].getDate()
	}

	const hours = Array.from({ length: 24 }, (v, i) => i)

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
						{dates.map((date, idx) => (
							<div key={idx} className="w-1/4">
								<div className="date text-center">{date}</div>
								<div className="flex flex-col">
									{hours.map((hour) => (
										<TimeSelectComponent
											key={hour}
											date={dateField[idx]}
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
