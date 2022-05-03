type ApiConfig = {
	apiUrl: string
	fullApiUrl: string
}

const isProd = process.env.NODE_ENV === 'production'
const apiConfig: ApiConfig = {
	apiUrl: isProd ? '/api' : 'http://localhost:8080/api',
	fullApiUrl: isProd
		? process.env.API_URL ?? 'https://hidiscuss.ga/api'
		: 'http://localhost:8080/api'
}

export default apiConfig
