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
			<div className="text-xl mb-2 ml-4">
				Discussion을 표현할 수 있는 태그를 선택해주세요
			</div>
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
		</div>
	)
}

export default SelectTagComponent
