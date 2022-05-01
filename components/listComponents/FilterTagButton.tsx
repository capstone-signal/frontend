import { useState } from 'react'

type Props = {
	index: number
	tagName: string
	letterCase: 'uppercase' | 'lowercase' | 'normal-case'
	selectedTagIds: number[]
	setSelectedTagIds: (value: number[]) => void
}

const FilterTagButton: React.FunctionComponent<Props> = ({
	index,
	tagName,
	letterCase,
	selectedTagIds,
	setSelectedTagIds
}) => {
	const [select, setSelect] = useState<boolean>(false)
	const clickTag = () => {
		if (!select) {
			setSelectedTagIds([...selectedTagIds, index])
		} else {
			setSelectedTagIds(selectedTagIds.filter((tag) => tag !== index))
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
