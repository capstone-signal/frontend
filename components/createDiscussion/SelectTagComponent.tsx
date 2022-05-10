import { useQuery } from 'react-query'
import { getTags } from '../../api/Tag'
import Spinner from '../Common/Spinner'
import TagButton from './TagButton'

type Props = {
	selectedTagIds: number[]
	setSelectedTagIds: (value: number[]) => void
}

const SelectTagComponent: React.FunctionComponent<Props> = ({
	selectedTagIds,
	setSelectedTagIds
}) => {
	const { data: tags, isLoading, error } = useQuery('tags', () => getTags())

	if (isLoading) {
		return <Spinner />
	}
	if (error) {
		return <Spinner />
	}
	return (
		<div>
			{tags?.map((tag, index) => (
				<div key={index} className="inline">
					<TagButton
						index={tag.id}
						tagName={tag.name}
						selectedTagIds={selectedTagIds}
						setSelectedTagIds={setSelectedTagIds}
					/>
				</div>
			))}
		</div>
	)
}

export default SelectTagComponent
