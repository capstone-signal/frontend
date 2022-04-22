const today = new Date()

export const DateField: Date[] = [today, today, today, today]

for (let i = 1; i < 4; i++) {
	const nextDate = new Date()
	nextDate.setDate(today.getDate() + i)
	DateField[i] = nextDate
}

export const Hours = Array.from({ length: 24 }, (v, i) => i)
