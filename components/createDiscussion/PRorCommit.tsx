import { useState } from 'react'
import { useQuery } from 'react-query'
import { getCommits, getMyRepos, getPullRequests } from '../../api/Github'

type Props = {
	discussionType: 'DIRECT' | 'COMMIT' | 'PR'
	setDiscussionType: (value: 'DIRECT' | 'COMMIT' | 'PR') => void
}

const PRorCommit: React.FunctionComponent<Props> = ({
	discussionType,
	setDiscussionType
}) => {
	const [selectedRepo, setSelectedRepo] = useState<number>(-1)
	const query = useQuery('getMyRepo', getMyRepos)
	const commitsQuery = useQuery('repoCommits', () => getCommits(selectedRepo), {
		enabled: selectedRepo > 0
	})
	const prQuery = useQuery(
		'repoPullRequests',
		() => getPullRequests(selectedRepo),
		{
			enabled: selectedRepo > 0
		}
	)
	return (
		<div className="flex flex-col">
			<select
				className="select select-primary w-full max-w-xs mb-2"
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
				<div>
					<div
						className="btn btn-ghost border-2 border-solid"
						onClick={() => setDiscussionType('COMMIT')}
					>
						Get my Commits
					</div>
					<div
						className="btn btn-ghost border-2 border-solid"
						onClick={() => setDiscussionType('PR')}
					>
						Get my pull Requests
					</div>
				</div>
			)}
			{discussionType === 'COMMIT' && (
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
			{discussionType === 'PR' && (
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
