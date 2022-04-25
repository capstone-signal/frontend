import TagButton from './TagButton'

type Props = {
	selectedTagIds: number[]
	setSelectedTagIds: (value: number[]) => void
}

const SelectTagComponent: React.FunctionComponent<Props> = ({
	selectedTagIds,
	setSelectedTagIds
}) => {
	const tags = [
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

	return (
		<div>
			{tags.map((tag, index) => (
				<div key={index} className="inline">
					<TagButton
						index={index}
						tagName={tag}
						selectedTagIds={selectedTagIds}
						setSelectedTagIds={setSelectedTagIds}
					/>
				</div>
			))}
		</div>
	)
}

export default SelectTagComponent
