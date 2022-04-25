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
		<>
			{select === false && (
				<div className="btn btn-outline btn-primary m-1" onClick={clickTag}>
					{tagName}
				</div>
			)}
			{select === true && (
				<div className="btn btn-primary m-1 box-border" onClick={clickTag}>
					{tagName}
				</div>
			)}
		</>
	)
}

export default SelectTagComponent
