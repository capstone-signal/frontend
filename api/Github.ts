import apiConfig from '../config/apiConfig'

type RepositoryResponse = {
	id: number
	fullName: string
	url: string
}

type CommitResponse = {
	sha: string
	url: string
	date: Date
	message: string
}

export async function getMyRepos(): Promise<RepositoryResponse[]> {
	const response = await fetch(`${apiConfig.apiUrl}/github/repos`) // TODO : abstracting api call
	if (!response.ok) {
		throw new Error('failed to fetch repos')
	}
	return response.json()
}

export async function getCommits(repoId: number): Promise<CommitResponse[]> {
	const response = await fetch(`${apiConfig.apiUrl}/github/commits/${repoId}`) // TODO : abstracting api call
	if (!response.ok) {
		throw new Error('failed to fetch repos')
	}
	return response.json()
}
