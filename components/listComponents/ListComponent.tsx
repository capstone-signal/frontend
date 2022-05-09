import { useState } from 'react'
import { useQuery } from 'react-query'
import { DiscussionFilter, getDiscussions } from '../../api/Discussion'
import DiscussionList from './DiscussionList'
import ListFilter from './ListFilter'
import Pagination from './Pagination'
import { useRouter } from 'next/router'

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {}

const ListComponent: React.FunctionComponent<Props> = () => {
	const router = useRouter()
	const { keyword, onlyMine, page, state, sort, tags } = router.query
	const [discussionFilter, setDiscussionFilter] = useState<DiscussionFilter>({
		onlyMine: false,
		tags: [],
		keyword: '',
		state: 'NOT_REVIEWED'
	})
	const {
		data: discussions,
		isLoading,
		error
	} = useQuery('discussions', () =>
		getDiscussions({ keyword, onlyMine, page, state, sort, tags })
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
