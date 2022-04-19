import next from 'next'
import { useState, useRef } from 'react'
import { LiveReviewAvailableTime } from '../../api/Discussion'

type Props = {
	key: number
	date: Date
	time: number
	liveReviewAvailableTimes: LiveReviewAvailableTime[]
	setLiveReviewAvailableTimes: (value: LiveReviewAvailableTime[]) => void
}

const LiveReviewCalendar: React.FunctionComponent<Props> = ({
	time,
	date,
	liveReviewAvailableTimes,
	setLiveReviewAvailableTimes
}) => {
	const [select, setSelect] = useState<boolean>(false)
	const Year = date.getFullYear()
	const Month = date.getMonth() + 1
	const Day = date.getDate()
	const start = new Date(Year, Month, Day, time, 0, 0)
	const end = new Date(Year, Month, Day, time + 1, 0, 0)
	const clickTime = () => {
		if (!select) {
			setLiveReviewAvailableTimes([
				...liveReviewAvailableTimes,
				{ start: start, end: end }
			])
		} else {
			setLiveReviewAvailableTimes(
				liveReviewAvailableTimes.filter(
					(availableTime) => availableTime.start.getTime() !== start.getTime()
				)
			)
		}
		setSelect(!select)
	}
	const nowtime = time < 10 ? '0' + time : time
	const nextTime = time < 9 ? '0' + (time + 1) : time + 1

	const contentTime = nowtime + ':00~' + nextTime + ':00'
	return (
		<div>
			{select === false && (
				<div className="btn btn-ghost" onClick={clickTime}>
					{contentTime}
				</div>
			)}
			{select === true && (
				<div className="btn btn-primary" onClick={clickTime}>
					{contentTime}
				</div>
			)}
		</div>
	)
}

export default LiveReviewCalendar
