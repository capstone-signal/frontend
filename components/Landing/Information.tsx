import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Crown from '../../public/crown.png'
import { getUserRanking } from '../../api/User'
import { useQuery } from 'react-query'
import Spinner from '../Common/Spinner'
import { DiscussionResponse, getDiscussions } from '../../api/Discussion'

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {}

const Information: React.FunctionComponent<Props> = () => {
	const { data: rankings, isLoading } = useQuery(`ranking`, () =>
		getUserRanking()
	)
	const { data: discussions_query, isLoading: discussionLoading } = useQuery(
		`discussions`,
		() => getDiscussions({})
	)
	const [discussions, setDiscussions] = useState<DiscussionResponse[]>([])
	useEffect(() => {
		if (discussions_query && discussions_query.content.length < 3) {
			setDiscussions(discussions_query.content)
		} else if (discussions_query) {
			setDiscussions(discussions_query.content.slice(0, 3))
		}
	}, [discussions_query])
	const color_list = [
		'bg-yellow-300',
		'bg-slate-300',
		'bg-yellow-600',
		'bg-rose-600',
		'bg-rose-600'
	]
	const onDiscussionClick = (id: number) => {
		window.location.href = `/discussion/${id}`
	}
	return (
		<div className="flex flex-col w-[calc(25%-1rem)] p-3 bg-stone-50 rounded-2xl overflow-x-auto">
			{isLoading ? (
				<Spinner />
			) : (
				<div className="min-h-[15rem] min-w-[15rem] flex flex-col items-center">
					<div className="flex flex-row justify-center mb-2 w-[100%]">
						<Image src={Crown} alt="crown_img" width={20} height={10} />
						<span className="font-semibold text-lg">
							&nbsp;HiDiscuss 포인트 랭킹
						</span>
					</div>
					<table className="table table-compact">
						<tbody>
							{rankings?.map((ranking, idx) => (
								<tr key={idx}>
									<td className="w-[2rem] text-center bg-transparent">
										<input
											className={`w-5 mask mask-star-2 ${color_list[idx]}`}
										/>
									</td>
									<td className="w-[7.5rem] text-center bg-transparent">
										{ranking.username}
									</td>
									<td className="w-[5rem] text-center bg-transparent">
										{ranking.point}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
			{discussionLoading ? (
				<Spinner />
			) : (
				<div className="min-h-[8rem] min-w-[15rem] flex flex-col items-center">
					<div className="flex flex-row justify-center mb-2 min-w-[15rem] w-[100%]">
						<span className="font-semibold text-lg">
							최근 올라온 Discussion
						</span>
					</div>
					<table className="table table-compact">
						<tbody>
							{discussions.map((discussion, idx) => (
								<tr
									className="cursor-pointer"
									key={idx}
									onClick={() => onDiscussionClick(discussion.id)}
								>
									<td className="w-[10rem] bg-transparent">
										<p className="w-[10rem] text-ellipsis overflow-hidden whitespace-nowrap">
											{discussion.title}
										</p>
									</td>
									<td className="w-[4.5rem] text-right bg-transparent">
										<p className="w-[4.5rem] text-ellipsis overflow-hidden whitespace-nowrap">
											{discussion.user.name}
										</p>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	)
}

export default Information
