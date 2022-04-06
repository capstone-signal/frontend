import { useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { getCommits, getMyRepos } from '../api/Github'

type Props = Record<string, any>

const CAPS104: React.FunctionComponent<Props> = () => {
	const [selectedRepo, setSelectedRepo] = useState<number>(-1)
	const queryClient = useQueryClient()
	const query = useQuery('getMyRepo', getMyRepos)
	const commitsQuery = useQuery(`${selectedRepo}`, () =>
		getCommits(selectedRepo)
	)
	return (
		<div>
			<select
				className="select select-primary w-full max-w-xs"
				onChange={(e) => setSelectedRepo(e.target.value)}
			>
				<option disabled selected>
					Get my Repository
				</option>
				{query.data?.map((repository, idx) => (
					<option key={idx} value={repository.fullName}>
						{repository.fullName}
					</option>
				))}
			</select>
		</div>
	)
}

export default CAPS104
