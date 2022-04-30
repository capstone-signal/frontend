import { CommonResponse } from './common'

export const user = {
	isLoggedIn: false
}

export type UserResponse = {
	accessToken: string
	email: string
	name: string
	point: number
}

export type userState = {
	id: number
	email: string
	username: string
	access_token: string
	refresh_token: string
	point: number
} & CommonResponse

export function isLoggedIn() {
	if (user.isLoggedIn) return true
	else return false
}

export function signIn() {
	user.isLoggedIn = true
}

export function signOut() {
	user.isLoggedIn = false
}
