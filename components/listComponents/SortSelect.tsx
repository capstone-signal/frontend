import { useRouter } from 'next/router'

interface FilterProps {
	defaultOption: string
}

const SortSelect: React.FunctionComponent<FilterProps> = ({
	defaultOption
}) => {
	const router = useRouter()
	const { tags, state, keyword } = router.query
	const handleSort = (newSort: string) => {
		router.push(`/list?page=1
			&state=${state ?? ''}
			&tags=${tags ?? ''}
			&keyword=${keyword ?? ''}
			&sort=${newSort ?? ''}
			&onlyMine=false`)
	}
	return (
		<div className="flex justify-end mb-4">
			<select
				className="select"
				key={defaultOption}
				defaultValue={defaultOption}
				onChange={(e) => handleSort(e.target.value)}
			>
				<option value="createdAt">최신순</option>
				<option value="priority">포인트순</option>
			</select>
		</div>
	)
}

export default SortSelect
