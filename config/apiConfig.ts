type ApiConfig = {
	websocketUrl: string
	apiUrl: string
	fullApiUrl: string
}

const isProd = process.env.NODE_ENV === 'production'
const apiConfig: ApiConfig = {
	websocketUrl: isProd
		? 'wss://hidiscuss.ga/socket/'
		: 'ws://localhost:3001/socket/',
	apiUrl: isProd ? '/api' : 'http://localhost:8080/api',
	fullApiUrl: isProd
		? process.env.API_URL ?? 'https://hidiscuss.ga/api'
		: 'http://localhost:8080/api'
}

export default apiConfig
