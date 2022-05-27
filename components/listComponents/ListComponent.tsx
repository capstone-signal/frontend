import { useRouter } from 'next/router'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { DiscussionFilter, getDiscussions } from '../../api/Discussion'
import DiscussionList from './DiscussionList'
import ListFilter from './ListFilter'
import Pagination from './Pagination'

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {}

const ListComponent: React.FunctionComponent<Props> = () => {
	const router = useRouter()
	const { page, sort, onlyMine } = router.query
	const tags = router.query.tags
		? (router.query.tags as string).split(',').map((tag) => Number(tag))
		: []
	const state = router.query.state as
		| 'NOT_REVIEWED'
		| 'REVIEWING'
		| 'COMPLETED'
		| undefined
	const keyword = router.query.keyword as string
	const [discussionFilter, setDiscussionFilter] = useState<DiscussionFilter>({
		onlyMine: false,
		tags: tags,
		keyword: keyword,
		state: state
	})
	const {
		data: discussions,
		isLoading,
		error
	} = useQuery(
		`discussions?page=${page}&state=${state}&tags=${tags}&keyword=${keyword}&onlyMine=false`,
		() => getDiscussions({ page, tags, state, keyword, sort, onlyMine })
	)
	return (
		<>
			<ListFilter
				discussionFilter={discussionFilter}
				setDiscussionFilter={setDiscussionFilter}
			/>
			<DiscussionList discussions={discussions?.content} />
			<Pagination discussionAmount={discussions?.totalElements} />
		</>
	)
}

export default ListComponent
