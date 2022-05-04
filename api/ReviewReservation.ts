import { CommonResponse, get, post } from './common'
import { DiscussionResponse } from './Discussion'

export type CreateReviewReservationRequest = {
	/** @format int64 */
	discussionId: number

	/** @format date-time */
	reviewDate: Date
}

export type ReviewReservationResponse = {
	discussion?: DiscussionResponse
	id: number
	isdone: boolean
	reviewDate: Date
	revieweeParticipated: boolean
	reviewerParticipated: boolean
} & CommonResponse

export async function getReviewReservationByDiscussionId(
	discussionId: number
): Promise<ReviewReservationResponse[]> {
	const response = await get<ReviewReservationResponse[]>(
		`/reservation?discussionId=${discussionId}`
	)
	return response
}

export async function createReviewReservation(
	data: CreateReviewReservationRequest
): Promise<ReviewReservationResponse> {
	const response = await post<ReviewReservationResponse>('/reservation', data)
	return response
}
