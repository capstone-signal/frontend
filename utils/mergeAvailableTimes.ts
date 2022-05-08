import { LiveReviewAvailableTime } from '../api/Discussion'

export function mergeAvailableTimes(
	liveReviewAvailableTimes: LiveReviewAvailableTime[]
): LiveReviewAvailableTime[] {
	// sort
	const sorted = liveReviewAvailableTimes.sort(
		(a, b) => a.start.getTime() - b.start.getTime()
	)

	// merge if overlaps
	const times: LiveReviewAvailableTime[] = [sorted[0]]

	for (let i = 1; i < sorted.length; i++) {
		const prev = times[times.length - 1]
		if (
			prev.end.getTime() === sorted[i].start.getTime() &&
			prev.start.getDate() === sorted[i].start.getDate()
		) {
			prev.end = sorted[i].end
		} else {
			times.push(sorted[i])
		}
	}
	return times
}
