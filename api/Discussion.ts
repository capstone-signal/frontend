import { CommonResponse, post } from './common'

export type LiveReviewAvailableTime = {
	start: Date
	end: Date
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

type DiscussionResponse = {
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
