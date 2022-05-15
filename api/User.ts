import { CommonResponse } from './common'
import jwt_decode from 'jwt-decode'

export type UserResponse = {
	id: number
	accessToken: string
	email: string
	name: string
	point: number
}

export function extractCookie(cookies: string, key: string) {
	const cookiestring = RegExp(key + '=[^;]+').exec(cookies)
	if (cookiestring == null) return null
	return decodeURIComponent(
		cookiestring ? cookiestring.toString().replace(/^[^=]+./, '') : ''
	)
}

export function isLogin(): number {
	if (typeof window !== 'object') return -1
	const cookie = document.cookie
	const accessToken = extractCookie(cookie, 'accessToken')
	const refreshToken = extractCookie(cookie, 'refreshToken')

	let accessTokenDecoded = null
	let refreshTokenDecoded = null
	if (accessToken != null) accessTokenDecoded = jwt_decode(accessToken) as any
	if (refreshToken != null)
		refreshTokenDecoded = jwt_decode(refreshToken) as any

	if (refreshTokenDecoded == null || accessToken == null) {
		return -1
	}
	return parseInt(accessTokenDecoded['userId'], 10)
}

export function signOut() {
	document.cookie = 'accessToken' + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;'
	document.cookie = 'refreshToken' + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;'
}
