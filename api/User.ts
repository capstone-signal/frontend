import { CommonResponse } from './common'
import jwt_decode from "jwt-decode";


export type userState = {
	id: number
	email: string
	username: string
	access_token: string
	refresh_token: string
	point: number
} & CommonResponse


export function getCook(cookiename:String)
{
	if(typeof window !== 'object') return;
	var cookiestring=RegExp(cookiename+"=[^;]+").exec(document.cookie);
	if(cookiestring == null)
		return null;
  	return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,"") : "");
}

export function isLogined() {
	var accessToken = getCook('accessToken');
	var refreshToken = getCook('refreshToken');

	var accessTokenDecoded = null;
	var refreshTokenDecoded = null;
	if(accessToken != null)
		accessTokenDecoded = jwt_decode(accessToken) as any;
	if(refreshToken != null)
		refreshTokenDecoded = jwt_decode(refreshToken) as any;

	if(refreshTokenDecoded == null || accessToken == null){
		return false;
	}
	return true
}



export function signOut() {
	document.cookie = "accessToken" + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
	document.cookie = "refreshToken" + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
}
