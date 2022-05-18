import { CommonResponse, get, PageResponse, post, put } from './common'
import { DiscussionCodeResponse } from './Discussion'
import { ReviewReservationResponse } from './ReviewReservation'
import { UserResponse } from './User'

type CompleteLiveReviewRequest = {
	changeCode: {
		[key: string]: string
	}
}

type UpdateFocusedDiffRequest = {
	codeAfter: string
}

export type ReviewResponse = {
	accepted: boolean
	commentDiffList: CommentReviewDiffResponse[]
	liveDiffList: LiveReviewDiffResponse[]
	/** @format int64 */
	id: number
	reviewType: 'COMMENT' | 'LIVE'
	reviewer: UserResponse
	threadList?: ThreadResponse[]
} & CommonResponse

export type ReviewPageResponse = {
	content: ReviewResponse[]
} & PageResponse

export type CommentReviewDiffResponse = {
	codeAfter: string
	codeLocate: string
	comment: string
	discussionCode: DiscussionCodeResponse
} & CommonResponse

export type LiveReviewDiffResponse = {
	codeAfter: string
	id: number
	discussionCode: DiscussionCodeResponse
} & CommonResponse

export type ThreadResponse = {
	id: number
	content: string
	user?: UserResponse
	//review?: ReviewResponse
} & CommonResponse

export type ThreadPageResponse = {
	content: ThreadResponse[]
} & PageResponse

export async function getReviewByDiscussionId(
	discussionId: number,
	page: number
): Promise<ReviewPageResponse> {
	// 호출하는 쪽에서 data 검증 필요
	const response = await get<ReviewPageResponse>(
		`/review?discussionId=${discussionId}&page=${page}`
	)
	return response
}

export async function createThread(
	reviewId: number,
	content: string
): Promise<ThreadResponse> {
	const response = await post<ThreadResponse>(`/review/${reviewId}/thread`, {
		content
	})
	return response
}

export async function getThreadByReviewId(
	reviewId: number,
	page: number
): Promise<ThreadPageResponse> {
	const response = await get<ThreadPageResponse>(
		`/review/${reviewId}/thread?page=${page}`
	)
	return response
}

export async function participateLiveReview(
	reservationId: number
): Promise<ReviewReservationResponse> {
	const response = await post<ReviewReservationResponse>(
		`/reservation/participate/${reservationId}`,
		{}
	)
	return response
}

export async function completeLiveReview(
	reservationId: number,
	data: CompleteLiveReviewRequest
): Promise<any> {
	await put<any>(`/review/complete/${reservationId}`, data)
}

export async function updateLiveReviewDiff(
	diffId: number,
	data: UpdateFocusedDiffRequest
): Promise<LiveReviewDiffResponse> {
	const response = await put<LiveReviewDiffResponse>(
		`/review/livediff/${diffId}`,
		data
	)
	return response
}
