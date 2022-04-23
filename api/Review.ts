import { CommonResponse } from './common'
import { DiscussionResponse } from './Discussion'
import { userState } from './User'

export type ReviewResponse = {
	accepted: boolean
	createdAt?: string
	diffList: CommentReviewDiffResponse[]
	discussion: DiscussionResponse

	/** @format int64 */
	id: number
	reviewType: 'COMMENT' | 'LIVE'
	reviewer: userState
} & CommonResponse

export type CommentReviewDiffResponse = { diff: string } & CommonResponse
