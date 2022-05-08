import apiConfig from '../config/apiConfig'

export type CommonResponse = {
	createdAt: Date
	lastModifiedAt: Date
}

export type Pageable = {
	sort: Record<string, any>
	offset: number
	pageNumber: number
	pageSize: number
	paged: boolean
	unpaged: boolean
}

export type PageResponse = {
	totalPages: number
	totalElements: number
	last: boolean
}

export function get<T>(url: string, opts: RequestInit = {}): Promise<T> {
	return fetch(getApiUrl(url), {
		...opts,
		headers: {
			...opts.headers,
			'Content-Type': 'application/json',
			Accept: 'application/json'
		}
	}).then((response) => {
		if (!response.ok) {
			throw new Error(`${response.status} ${response.statusText}`)
		}
		return response.json()
	})
}

export function post<T>(
	url: string,
	body: any,
	isMultipart = false,
	opts: RequestInit = {}
): Promise<T> {
	return fetch(getApiUrl(url), {
		...opts,
		method: 'POST',
		body: opts.body || JSON.stringify(body),
		headers: {
			...opts.headers,
			'Content-Type': isMultipart ? 'multipart/form-data' : 'application/json',
			Accept: 'application/json'
		}
	}).then((response) => {
		if (!response.ok) {
			throw new Error(`${response.status} ${response.statusText}`)
		}
		return response.json()
	})
}

function getApiUrl(url: string): string {
	try {
		// check browser environment
		window && document
		return `${apiConfig.apiUrl}${url}`
	} catch (e) {
		// server side
		return `${apiConfig.fullApiUrl}${url}`
	}
}
