import FilterTagButton from './FilterTagButton'

type Props = {
	tags: string[]
	letterCase: 'uppercase' | 'lowercase' | 'normal-case'
	selectedFilterIds: number[]
	setSelectedFilterIds: (value: number[]) => void
}

const SelectFilterComponent: React.FunctionComponent<Props> = ({
	tags,
	letterCase,
	selectedFilterIds,
	setSelectedFilterIds
}) => {
	return (
		<div className="w-5/6">
			{tags.map((tag, index) => (
				<div key={index} className="inline">
					<FilterTagButton
						index={index}
						tagName={tag}
						letterCase={letterCase}
						selectedTagIds={selectedFilterIds}
						setSelectedTagIds={setSelectedFilterIds}
					/>
				</div>
			))}
		</div>
	)
}

export default SelectFilterComponent
