import FilterTagButton from './FilterTagButton'

type Props = {
	tags: string[]
	letterCase: 'uppercase' | 'lowercase' | 'normal-case'
	selectedFilters: string[]
	setSelectedFilters: (value: string[]) => void
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
						tagName={tag}
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
