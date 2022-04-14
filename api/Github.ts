import { get } from './common'

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

type PullRequestResponse = {
	id: number
	title: string
	url: string
}

export async function getMyRepos(): Promise<RepositoryResponse[]> {
	const response = await get<RepositoryResponse[]>('/github/repo')
	return response
}

export async function getCommits(repoId: number): Promise<CommitResponse[]> {
	const response = await get<CommitResponse[]>(`/github/repo/${repoId}/commit`)
	return response
}

export async function getPullRequests(
	repoId: number
): Promise<PullRequestResponse[]> {
	const response = await get<PullRequestResponse[]>(`/github/repo/${repoId}/pr`)
	return response
}
