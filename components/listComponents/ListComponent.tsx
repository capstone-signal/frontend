import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { DiscussionFilter, getDiscussions } from '../../api/Discussion'
import DiscussionList from './DiscussionList'
import ListFilter from './ListFilter'
import Pagination from './Pagination'

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
		state: undefined
	})
	const {
		data: discussions,
		isLoading,
		error
	} = useQuery(
		`discussions?page=${page}&state=${state}&tags=${tags}&keyword=${keyword}&onlyMine=false`,
		() => getDiscussions({ page, tags, state, keyword, sort, onlyMine })
	)
	useEffect(() => {
		setDiscussionFilter({
			onlyMine: false,
			tags: router.query.tags
				? (router.query.tags as string).split(',').map((tag) => Number(tag))
				: [],
			keyword: router.query.keyword as string,
			state: router.query.state as
				| 'NOT_REVIEWED'
				| 'REVIEWING'
				| 'COMPLETED'
				| undefined
		})
	}, [router])
	return (
		<>
			<ListFilter
				discussionFilter={discussionFilter}
				setDiscussionFilter={setDiscussionFilter}
			/>
			<DiscussionList discussions={discussions?.content} />
			<Pagination
				discussionAmount={discussions?.totalElements}
				urlFrom={'list'}
				onlyMine={'false'}
			/>
		</>
	)
}

export default ListComponent
