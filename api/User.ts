import { CommonResponse } from './common'
import jwt_decode from 'jwt-decode'

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

export function getCook(cookiename: string) {
	if (typeof window !== 'object') return
	const cookiestring = RegExp(cookiename + '=[^;]+').exec(document.cookie)
	if (cookiestring == null) return null
	return decodeURIComponent(
		cookiestring ? cookiestring.toString().replace(/^[^=]+./, '') : ''
	)
}

export function isLogin() {
	const accessToken = getCook('accessToken')
	const refreshToken = getCook('refreshToken')

	let accessTokenDecoded = null
	let refreshTokenDecoded = null
	if (accessToken != null) accessTokenDecoded = jwt_decode(accessToken) as any
	if (refreshToken != null)
		refreshTokenDecoded = jwt_decode(refreshToken) as any

	if (refreshTokenDecoded == null || accessToken == null) {
		return false
	}
	return true
}

export function signOut() {
	document.cookie = 'accessToken' + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;'
	document.cookie = 'refreshToken' + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;'
}
