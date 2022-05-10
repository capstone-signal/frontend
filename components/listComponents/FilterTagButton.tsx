import { useState } from 'react'
import { TagResponse } from '../../api/Tag'

type Props = {
	tag: TagResponse
	letterCase: 'uppercase' | 'lowercase' | 'normal-case'
	selectedFilters: number[]
	setSelectedFilters: (value: number[]) => void
}

const FilterTagButton: React.FunctionComponent<Props> = ({
	tag,
	letterCase,
	selectedFilters,
	setSelectedFilters
}) => {
	const [select, setSelect] = useState<boolean>(false)
	const clickTag = () => {
		if (!select) {
			setSelectedFilters([...selectedFilters, tag.id])
		} else {
			setSelectedFilters(selectedFilters.filter((key) => key !== tag.id))
		}
		setSelect(!select)
	}
	return (
		<div
			className={`btn btn-small m-1 rounded-3xl h-[2.5rem] min-h-[2.5rem] ${letterCase} ${
				select ? `btn-success` : `btn-outline`
			}`}
			onClick={clickTag}
		>
			{tag.name}
		</div>
	)
}

export default FilterTagButton
