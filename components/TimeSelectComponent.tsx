import next from 'next'
import { useState, useRef } from 'react'

type Props = Record<string, any>

const LiveReviewCalendar: React.FunctionComponent<Props> = (props) => {
	const [select, setSelect] = useState<boolean>(false)
	const clickTime = () => {
		setSelect(!select)
	}
	const time = props.time < 10 ? '0' + props.time : props.time
	const nextTime = props.time < 9 ? '0' + (props.time + 1) : props.time + 1

	const contentTime = time + ':00~' + nextTime + ':00'
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
