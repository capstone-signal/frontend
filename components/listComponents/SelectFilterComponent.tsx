import { TagResponse } from '../../api/Tag'
import FilterTagButton from './FilterTagButton'

type Props = {
	tags: TagResponse[]
	letterCase: 'uppercase' | 'lowercase' | 'normal-case'
	selectedFilters: number[]
	setSelectedFilters: (value: number[]) => void
}

const SelectFilterComponent: React.FunctionComponent<Props> = ({
	tags,
	letterCase,
	selectedFilters,
	setSelectedFilters
}) => {
	return (
		<div className="w-5/6">
			{tags.map((tag, index) => (
				<div key={index} className="inline">
					<FilterTagButton
						tag={tag}
						letterCase={letterCase}
						selectedFilters={selectedFilters}
						setSelectedFilters={setSelectedFilters}
					/>
				</div>
			))}
		</div>
	)
}

export default SelectFilterComponent
