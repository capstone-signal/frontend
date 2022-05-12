import { CommonResponse, get, post } from './common'
import { DiscussionResponse } from './Discussion'
import { UserResponse } from './User'

export type CreateReviewReservationRequest = {
	/** @format int64 */
	discussionId: number

	/** @format date-time */
	reviewStartDateTime: Date
}

export type ReviewReservationResponse = {
	discussion?: DiscussionResponse
	reviewer?: UserResponse
	id: number
	isdone: boolean
	reviewStartDateTime: Date
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

export async function getMyAvailableReservations(): Promise<
	ReviewReservationResponse[]
	> {
	const response = await get<ReviewReservationResponse[]>('/reservation/my')
	return response
}

export async function getReviewReservationById(
	id: number
): Promise<ReviewReservationResponse> {
	const response = await get<ReviewReservationResponse>(`/reservation/${id}`)
	return response
}
