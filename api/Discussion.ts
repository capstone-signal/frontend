import { CommonResponse, get, post } from './common'
import { TagResponse } from './Tag'
import { UserResponse } from './User'

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
	language: string
}

export type DiscussionBox = {
	id: number
	title: string
	user_name: string
	question: string
	state: DiscussionState
	//tags: TagResponse[]
	//user: UserResponse
}

type CreateDiscussionRequest = {
	discussionType: 'PR' | 'COMMIT' | 'DIRECT'
	question: string
	tagIds: number[]
	title: string
	usePriority: boolean
	liveReviewRequired: boolean
	liveReviewAvailableTimes?: {
		times: LiveReviewAvailableTime[]
	}
	codes?: DirectCode[]
	gitRepositoryId?: number
	gitNodeId?: string
}

export type DiscussionDetailResponse = {
	codes: DiscussionCodeResponse[]
	discussion: DiscussionResponse
}

export type DiscussionResponse = {
	id: number
	liveReviewRequired: boolean
	liveReviewAvailableTimes: {
		times: LiveReviewAvailableTime[]
	}
	priority: number
	title: string
	question: string
	state: DiscussionState
	discussionResponseDto: any
	tags: TagResponse[]
	user: UserResponse
} & CommonResponse

export type DiscussionCodeResponse = {
	id: number
	filename: string
	content: string
} & CommonResponse

export type DiscussionFilter = {
	keyword?: string
	onlyMine: boolean
	page?: number
	sort?: 'createdAt' | 'priority'
	state?: 'NOT_REVIEWED' | 'REVIEWING' | 'COMPLETED'
	tags: number[]
}

export type DiscussionListResponse = {
	content: DiscussionResponse[]
	empty: boolean
	first: boolean
	last: boolean
	number: number
	numberOfElements: number
	size: number
	sort: number
	totalElements: number
	totalPages: number
}

export async function createDiscussion(
	data: CreateDiscussionRequest
): Promise<DiscussionResponse> {
	// 호출하는 쪽에서 data 검증 필요
	const response = await post<DiscussionResponse>('/discussion/', data)
	return response
}

export async function getDiscussionById(
	id: number
): Promise<DiscussionDetailResponse> {
	const response = await get<DiscussionDetailResponse>(`/discussion/${id}`)
	return response
}

export async function getDiscussions(data: {
	page: string | string[] | undefined
	keyword: string | string[] | undefined
	sort: string | string[] | undefined
	state: string | string[] | undefined
	tags: string | string[] | undefined
	onlyMine: string | string[] | undefined
}): Promise<DiscussionListResponse> {
	let url = ''
	if (data.page != undefined) url = url + `page=${data.page}&`
	if (data.keyword != undefined) url = url + `keyword=${data.keyword}&`
	if (data.sort != undefined) url = url + `sort=${data.sort}&`
	if (data.state != undefined) url = url + `state=${data.state}&`
	if (data.tags != undefined) url = url + `tags=${data.tags}&`
	if (data.tags != undefined) url = url + `onlyMine=${data.onlyMine}`
	else url = url + `onlyMine=false`
	const response = await get<DiscussionListResponse>(`/discussion/?${url}`)
	console.log(url, response)
	return response
}
