import { CommonResponse } from './common'

export type userState = {
	id: number
	email: string
	username: string
	access_token: string
	refresh_token: string
	point: number
} & CommonResponse
