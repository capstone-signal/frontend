import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { DiscussionFilter, getDiscussions } from '../../api/Discussion'
import Spinner from '../Common/Spinner'
import DiscussionList from './DiscussionList'
import ListFilter from './ListFilter'
import Pagination from './Pagination'
import SortSelect from './SortSelect'

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {}

const ListComponent: React.FunctionComponent<Props> = () => {
	const router = useRouter()
	const { page, state, keyword, sort, onlyMine } = router.query
	const tags = router.query.tags
		? (router.query.tags as string).split(',').map((tag) => Number(tag))
		: []
	const [discussionFilter, setDiscussionFilter] = useState<DiscussionFilter>({
		onlyMine: false,
		tags: [],
		keyword: '',
		state: '',
		sort: undefined
	})
	const {
		data: discussions,
		isLoading,
		isError
	} = useQuery(
		`discussions?page=${page}&state=${state}&tags=${tags}&keyword=${keyword}&sort=${sort}&onlyMine=false`,
		() => getDiscussions({ page, tags, state, keyword, sort, onlyMine })
	)
	useEffect(() => {
		const { tags, state, keyword, sort } = router.query
		setDiscussionFilter({
			onlyMine: false,
			tags: tags ? (tags as string).split(',').map((tag) => Number(tag)) : [],
			keyword: keyword as string,
			state: (state as '' | 'NOT_REVIEWED' | 'REVIEWING' | 'COMPLETED') ?? '',
			sort: sort as 'createdAt' | 'priority'
		})
	}, [router])
	return (
		<>
			<ListFilter
				discussionFilter={discussionFilter}
				setDiscussionFilter={setDiscussionFilter}
			/>
			<SortSelect defaultOption={router.query.sort as string} />
			{isLoading || isError ? (
				<Spinner />
			) : (
				<DiscussionList discussions={discussions?.content} />
			)}
			<Pagination
				discussionAmount={discussions?.totalElements}
				urlFrom={'list'}
				onlyMine={'false'}
			/>
		</>
	)
}

export default ListComponent
