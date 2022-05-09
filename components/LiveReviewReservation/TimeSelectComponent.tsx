import { useState } from 'react'
import {
	getTimeRange,
	getTimeRangeString
} from '../../variables/TodayTo3DaysAndTime'

type Props = {
	key: number
	date: Date
	hour: number
	addAvailableTime: (value1: Date, value2: Date) => void
	removeAvailableTime: (value: Date) => void
}

const TimeSelectComponent: React.FunctionComponent<Props> = ({
	hour,
	date,
	addAvailableTime,
	removeAvailableTime
}) => {
	const [select, setSelect] = useState<boolean>(false)
	const now = new Date()
	const { startTime, endTime } = getTimeRange(date, hour)
	const timeRangeString = getTimeRangeString(hour)

	const clickTime = () => {
		if (!select) {
			addAvailableTime(startTime, endTime)
		} else {
			removeAvailableTime(startTime)
		}
		setSelect(!select)
	}

	return (
		<div>
			<div
				className={`btn w-full ${
					startTime < now
						? `btn-disabled`
						: `${select ? 'btn-primary' : 'btn-ghost'}`
				}`}
				onClick={clickTime}
			>
				{timeRangeString}
			</div>
		</div>
	)
}

export default TimeSelectComponent
