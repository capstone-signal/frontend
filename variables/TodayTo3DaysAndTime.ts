const today = new Date()

export const DateField: Date[] = [today, today, today, today]

for (let i = 1; i < 4; i++) {
	const nextDate = new Date()
	nextDate.setDate(today.getDate() + i)
	DateField[i] = nextDate
}

export const Hours = Array.from({ length: 24 }, (v, i) => i)

export function getTimeRange(date: Date, hour: number) {
	const Year = date.getFullYear()
	const Month = date.getMonth()
	const Day = date.getDate()
	const startTime = new Date(Year, Month, Day, hour, 0, 0)
	const endTime = new Date(Year, Month, Day, hour + 1, 0, 0)

	return { startTime, endTime }
}

export function getTimeRangeString(hour: number) {
	const nowtime = hour < 10 ? '0' + hour : hour
	const nextTime = hour < 9 ? '0' + (hour + 1) : hour + 1

	const timeRangeString = nowtime + ':00~' + nextTime + ':00'
	return timeRangeString
}
