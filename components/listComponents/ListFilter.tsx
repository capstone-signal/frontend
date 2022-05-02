import { useState } from 'react'
import Link from 'next/link'
import SelectFilterComponent from './SelectStateComponent'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface FilterProps {}

const ListFilter: React.FunctionComponent<FilterProps> = () => {
	const [selectedTags, setSelectedTags] = useState<string[]>([])
	const [selectedStates, setSelectedStates] = useState<string[]>([])
	const [searchFilter, setSearchFilter] = useState<string>('')
	const languageTags = [
		'react',
		'vue',
		'nextjs',
		'spring',
		'express',
		'django',
		'flask',
		'c',
		'c++',
		'python',
		'java',
		'javascript',
		'typescript',
		'kotlin',
		'tensorflow',
		'machine learning',
		'web frontend',
		'web backend',
		'android',
		'ios',
		'swift',
		'sql',
		'nosql'
	]
	const stateTags = ['Not reviewed', 'Reviewing', 'Completed']
	return (
		<div className="border-2 border-solid border-gray-400 rounded-xl p-3 mb-4">
			<div className="text-xl mb-2 font-bold">검색 필터</div>
			<div className="flex flex-row mb-2">
				<div className="text-xl text-center w-[6.5rem] mt-2">Tags</div>
				<SelectFilterComponent
					tags={languageTags}
					letterCase={'uppercase'}
					selectedFilters={selectedTags}
					setSelectedFilters={setSelectedTags}
				/>
			</div>
			<div className="flex flex-row mb-2">
				<div className="text-xl text-center w-[6.5rem] mt-2">States</div>
				<SelectFilterComponent
					tags={stateTags}
					letterCase={'normal-case'}
					selectedFilters={selectedStates}
					setSelectedFilters={setSelectedStates}
				/>
			</div>
			<div className="flex flex-row justify-between">
				<div className="flex flex-row">
					<div className="text-xl text-center w-[6.5rem] mt-2">Search</div>
					<input
						type="text"
						className="input input-bordered rounded-3xl ml-1 h-[2.5rem] min-h-[2.5rem] w-[20rem]"
						placeholder="검색어를 입력하세요"
						value={searchFilter}
						onChange={(e) => setSearchFilter(e.target.value)}
					/>
				</div>
				<Link
					href={`/list?page=1&state=${selectedStates}&tags=${selectedTags}&search=${searchFilter}`}
					passHref
				>
					<button className="btn btn-accent">설정 완료</button>
				</Link>
			</div>
		</div>
	)
}

export default ListFilter
