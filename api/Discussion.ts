import { CommonResponse, get, post } from './common'

export type LiveReviewAvailableTime = {
	start: Date | string
	end: Date | string
}

export enum DiscussionState {
	NOT_REVIED = 0,
	REVIEWING = 1,
	COMPLETED = 2
}
export type DirectCode = {
	content: string
	filename: string
}

type CreateDiscussionRequest = {
	discussionType: 'PR' | 'COMMIT' | 'DIRECT'
	question: string
	tagIds: number[]
	usePriority: boolean
	liveReviewRequired: boolean
	liveReviewAvailableTimes?: {
		times: LiveReviewAvailableTime[]
	}
	codes?: DirectCode[]
	gitRepositoryId?: number
	gitNodeId?: string
}

export type DiscussionResponse = {
	id: number
	liveReviewRequired: boolean
	liveReviewAvailableTimes: {
		times: LiveReviewAvailableTime[]
	}
	priority: number
	question: string
	state: DiscussionState
	//tags: TagResponse[]
	//user: UserResponse
} & CommonResponse

export async function createDiscussion(
	data: CreateDiscussionRequest
): Promise<DiscussionResponse> {
	// 호출하는 쪽에서 data 검증 필요
	const response = await post<DiscussionResponse>('/discussion', data)
	return response
}

export async function getDiscussionById(
	id: number
): Promise<DiscussionResponse> {
	return {
		id: 1,
		createdAt: '2021-01-01T00:00:00.000Z',
		lastModifiedAt: '2021-01-01T00:00:00.000Z',
		liveReviewRequired: true,
		liveReviewAvailableTimes: {
			times: [
				{
					start: '2021-01-01T00:00:00.000Z', //new Date(),
					end: '2021-01-01T00:00:00.000Z' //new Date()
				}
			]
		},
		priority: 1,
		question: '질문입니다213',
		state: DiscussionState.NOT_REVIED
	}
	const response = await get<DiscussionResponse>(`/discussion/${id}`)
	return response
}
