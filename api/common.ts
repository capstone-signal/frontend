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
		credentials: 'include',
		headers: {
			...opts.headers,
			'Content-Type': 'application/json',
			Accept: 'application/json',
			cookie: typeof document !== 'undefined' ? document.cookie : ''
		}
	}).then((response) => {
		if (!response.ok) {
			throw new Error(`${response.status} ${JSON.stringify(response.body)}`)
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
		credentials: 'include',
		headers: {
			...opts.headers,
			'Content-Type': isMultipart ? 'multipart/form-data' : 'application/json',
			Accept: 'application/json',
			cookie: typeof document !== 'undefined' ? document.cookie : '',
		}
	}).then((response) => {
		if (!response.ok) {
			throw new Error(`${response.status} ${JSON.stringify(response.body)}}`)
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
