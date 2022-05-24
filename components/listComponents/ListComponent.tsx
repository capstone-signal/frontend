import { useRouter } from 'next/router'
import { useState } from 'react'
import { DiscussionFilter, DiscussionListResponse } from '../../api/Discussion'
import DiscussionList from './DiscussionList'
import ListFilter from './ListFilter'
import Pagination from './Pagination'

type Props = {
	discussions: DiscussionListResponse
}

const ListComponent: React.FunctionComponent<Props> = ({ discussions }) => {
	const router = useRouter()
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
