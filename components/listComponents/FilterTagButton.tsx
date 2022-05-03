import { useState } from 'react'

type Props = {
	tagName: string
	letterCase: 'uppercase' | 'lowercase' | 'normal-case'
	selectedFilters: string[]
	setSelectedFilters: (value: string[]) => void
}

const FilterTagButton: React.FunctionComponent<Props> = ({
	tagName,
	letterCase,
	selectedFilters,
	setSelectedFilters
}) => {
	const [select, setSelect] = useState<boolean>(false)
	const clickTag = () => {
		if (!select) {
			setSelectedFilters([...selectedFilters, tagName])
		} else {
			setSelectedFilters(selectedFilters.filter((tag) => tag !== tagName))
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
			{tagName}
		</div>
	)
}

export default FilterTagButton
