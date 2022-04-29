import { useState, useRef } from 'react'

type Props = {
	index: number
	tagName: string
	selectedTagIds: number[]
	setSelectedTagIds: (value: number[]) => void
}

const SelectTagComponent: React.FunctionComponent<Props> = ({
	index,
	tagName,
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
			className={`btn btn-primary m-1 ${select ? '' : 'btn-outline'}`}
			onClick={clickTag}
		>
			{tagName}
		</div>
	)
}

export default SelectTagComponent
