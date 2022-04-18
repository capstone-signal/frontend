import { useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { getCommits, getMyRepos, getPullRequests } from '../../api/Github'
import CreateDiscussionForm from '../CreateDiscussionForm'

type Props = Record<string, any>

const PRorCommit: React.FunctionComponent<Props> = () => {
	const [selectedRepo, setSelectedRepo] = useState<number>(-1)
	const query = useQuery('getMyRepo', getMyRepos)
	console.log(query)
	const commitsQuery = useQuery(
		`${selectedRepo}`,
		() => getCommits(selectedRepo),
		{
			enabled: selectedRepo > 0
		}
	)
	const prQuery = useQuery(
		`${selectedRepo}`,
		() => getPullRequests(selectedRepo),
		{
			enabled: selectedRepo > 0
		}
	)

	return (
		<div>
			<select
				className="select select-primary w-full max-w-xs"
				onChange={(e) => setSelectedRepo(parseInt(e.target.value))}
			>
				<option disabled selected>
					Get my Repository
				</option>
				{query.data?.map((repository, idx) => (
					<option key={idx} value={repository.id}>
						{repository.fullName}
					</option>
				))}
			</select>
			{selectedRepo > -1 && (
				<select className="select select-primary w-full max-w-xs">
					<option disabled selected>
						Get my Commits
					</option>
					{commitsQuery.data?.map((commit, idx) => (
						<option key={idx} value={commit.sha}>
							{commit.message}
						</option>
					))}
				</select>
			)}
			{selectedRepo > -1 && (
				<select className="select select-primary w-full max-w-xs">
					<option disabled selected>
						Get my Pull Requests
					</option>
					{prQuery.data?.map((pr, idx) => (
						<option key={idx} value={pr.id}>
							{pr.title}
						</option>
					))}
				</select>
			)}
		</div>
	)
}

export default PRorCommit
