import { useState } from 'react'
import { useQuery } from 'react-query'
import { getCommits, getMyRepos, getPullRequests } from '../../api/Github'
import Spinner from '../Common/Spinner'

type Props = {
	discussionType: 'DIRECT' | 'COMMIT' | 'PR'
	setDiscussionType: (value: 'DIRECT' | 'COMMIT' | 'PR') => void
	selectedRepo: number
	setSelectedRepo: any
	selectedGitNode: string
	setSelectedGitNode: any
}

const PRorCommit: React.FunctionComponent<Props> = ({
	discussionType,
	setDiscussionType,
	selectedRepo,
	setSelectedRepo,
	selectedGitNode,
	setSelectedGitNode
}) => {
	const { isLoading: isRepoLoading, data: repos } = useQuery(
		'getMyRepo',
		getMyRepos
	)
	const { isLoading: isCommitsLoading, data: commits } = useQuery(
		`repoCommits${selectedRepo}`,
		() => getCommits(selectedRepo),
		{
			enabled: selectedRepo > 0 && discussionType === 'COMMIT'
		}
	)
	const { isLoading: isPrLoading, data: prs } = useQuery(
		`repoPullRequests${selectedRepo}`,
		() => getPullRequests(selectedRepo),
		{
			enabled: selectedRepo > 0 && discussionType === 'PR'
		}
	)

	return (
		<div className="flex flex-col">
			{isRepoLoading ? (
				<Spinner />
			) : (
				<div className="flex">
					<select
						className="select select-primary w-full max-w-xs mb-6 mr-6"
						onChange={(e) => setSelectedRepo(parseInt(e.target.value))}
					>
						<option disabled selected>
							Repository 선택하기
						</option>
						{repos?.map((repository, idx) => (
							<option key={idx} value={repository.id}>
								{repository.fullName}
							</option>
						))}
					</select>
					{selectedRepo > -1 && (
						<div className="">
							<div
								className={`btn border-2 border-solid mr-6 ${
									discussionType === 'COMMIT' && 'btn-primary'
								}`}
								onClick={() => setDiscussionType('COMMIT')}
							>
								Commit 가져오기
							</div>
							<div
								className={`btn border-2 border-solid ${
									discussionType === 'PR' && 'btn-primary'
								}`}
								onClick={() => setDiscussionType('PR')}
							>
								Pull Request 가져오기
							</div>
						</div>
					)}
				</div>
			)}
			<div className="flex flex-col border-2 overflow-y-scroll h-[30rem]">
				{(isCommitsLoading || isPrLoading) && <Spinner />}
				{discussionType === 'COMMIT' &&
					commits?.map((commit, idx) => (
						<div key={idx} className="flex p-4 text-lg items-center">
							<input
								type="radio"
								className="radio radio-primary"
								checked={selectedGitNode === commit.sha}
								onChange={() => setSelectedGitNode(commit.sha)}
							/>
							<a
								href={commit.url}
								target="_blank"
								className="ml-4"
								rel="noreferrer"
							>
								{commit.message}
							</a>
						</div>
					))}
				{discussionType === 'PR' &&
					prs?.map((pr, idx) => (
						<div key={idx} className="flex p-4 text-lg items-center">
							<input
								type="radio"
								className="radio radio-primary"
								checked={selectedGitNode === pr.id.toString()}
								onChange={() => setSelectedGitNode(pr.id)}
							/>
							<a
								href={pr.url}
								target="_blank"
								className="ml-4"
								rel="noreferrer"
							>
								{pr.title}
							</a>
						</div>
					))}
			</div>
		</div>
	)
}

export default PRorCommit
