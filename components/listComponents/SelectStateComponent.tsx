type Props = {
	selectedState: 'NOT_REVIEWED' | 'REVIEWING' | 'COMPLETED' | undefined
	setSelectedState: (value: 'NOT_REVIEWED' | 'REVIEWING' | 'COMPLETED') => void
}

const SelectStateComponent: React.FunctionComponent<Props> = ({
	selectedState,
	setSelectedState
}) => {
	const stateTags = [
		{ id: 'NOT_REVIEWED', name: 'Not reviewed' },
		{ id: 'REVIEWING', name: 'Reviewing' },
		{ id: 'COMPLETED', name: 'Completed' }
	]
	const clickTag = (newState: any) => {
		setSelectedState(newState)
	}
	return (
		<div className="w-5/6">
			{stateTags.map((state, index) => (
				<div key={index} className="inline">
					<div
						className={`btn btn-small m-1 rounded-3xl h-[2.5rem] min-h-[2.5rem] ${
							selectedState == state.id ? `btn-success` : `btn-outline`
						}`}
						onClick={() => clickTag(state.id)}
					>
						{state.name}
					</div>
				</div>
			))}
		</div>
	)
}

export default SelectStateComponent
