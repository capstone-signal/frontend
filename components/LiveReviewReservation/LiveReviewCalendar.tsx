import next from 'next'
import { useState, useRef } from 'react'
import TimeSelectComponent from './TimeSelectComponent'

type Props = Record<string, any>

const LiveReviewCalendar: React.FunctionComponent<Props> = () => {
	const [selectedTime, setSelectedTime] = useState<number>(-1)

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
			<a href="#liveReviewModal" className="btn modal-button">
				Live Review Picker
			</a>
			<div className="modal" id="liveReviewModal">
				<div className="modal-box">
					<div className="flex flex-row w-full border-solid border-2 rounded">
						{dates.map((date, idx) => (
							<div key={idx} className="w-1/4">
								<div className="date text-center">{date}</div>
								<div className="flex flex-col">
									{hours.map((hour) => (
										<TimeSelectComponent key={hour} time={hour} />
										//<div className="hour btn btn-ghost" key={hour}>
										//	{hour}
										//</div>
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
