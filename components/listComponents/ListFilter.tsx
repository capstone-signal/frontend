import Link from 'next/link'
import { useQuery } from 'react-query'
import { getTags } from '../../api/Tag'
import Spinner from '../Common/Spinner'
import SelectFilterComponent from './SelectFilterComponent'
import SelectStateComponent from './SelectStateComponent'
import { DiscussionFilter } from '../../api/Discussion'

interface FilterProps {
	discussionFilter: DiscussionFilter
	setDiscussionFilter: (value: DiscussionFilter) => void
}

const ListFilter: React.FunctionComponent<FilterProps> = ({
	discussionFilter,
	setDiscussionFilter
}) => {
	const handleSelectedTags = (newTags: number[]) => {
		setDiscussionFilter({ ...discussionFilter, tags: newTags })
	}
	const handleSelectedState = (
		newState: 'NOT_REVIEWED' | 'REVIEWING' | 'COMPLETED'
	) => {
		setDiscussionFilter({ ...discussionFilter, state: newState })
	}
	const {
		data: languageTags,
		isLoading,
		error
	} = useQuery('tags', () => getTags())
	return (
		<div className="border-2 border-solid border-gray-400 rounded-xl p-3 mb-4 bg-base-200">
			<div className="text-xl mb-2 font-bold">검색 필터</div>
			<div className="flex flex-row mb-2">
				<div className="text-xl text-center w-[6.5rem] mt-2">Tags</div>
				{isLoading || error ? (
					<Spinner />
				) : (
					<SelectFilterComponent
						// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
						tags={languageTags!}
						letterCase={'uppercase'}
						selectedFilters={discussionFilter.tags}
						setSelectedFilters={handleSelectedTags}
					/>
				)}
			</div>
			<div className="flex flex-row mb-2">
				<div className="text-xl text-center w-[6.5rem] mt-2">States</div>
				<SelectStateComponent
					selectedState={discussionFilter.state}
					setSelectedState={handleSelectedState}
				/>
			</div>
			<div className="flex flex-row justify-between">
				<div className="flex flex-row">
					<div className="text-xl text-center w-[6.5rem] mt-2">Search</div>
					<input
						type="text"
						className="input input-bordered rounded-3xl ml-1 h-[2.5rem] min-h-[2.5rem] w-[20rem]"
						placeholder="검색어를 입력하세요"
						value={discussionFilter.keyword}
						onChange={(e) =>
							setDiscussionFilter({
								...discussionFilter,
								keyword: e.target.value
							})
						}
					/>
				</div>
				<Link
					href={`/list?page=1&state=${discussionFilter.state}&tags=${discussionFilter.tags}&keyword=${discussionFilter.keyword}&onlyMine=false`}
					passHref
				>
					<button className="btn btn-accent">설정 완료</button>
				</Link>
			</div>
		</div>
	)
}

export default ListFilter
