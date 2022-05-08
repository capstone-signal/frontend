import { get } from './common'

export type TagResponse = {
	id: number
	name: string
}

export async function getTags(): Promise<TagResponse[]> {
	const response = await get<TagResponse[]>(`/tag`)
	return response
}
