import { useState } from 'react'
import DiscussionList from './DiscussionList'
import ListFilter from './ListFilter'
import Pagination from './Pagination'

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {}

const ListComponent: React.FunctionComponent<Props> = () => {
	const discussions = new Array(7).fill({
		id: 1,
		title: '1번 discussion',
		reviewee: 'test_reviewee',
		question: 'OOO에 대한 질문이 있습니다.',
		state: 0
	})
	return (
		<>
			<ListFilter />
			<DiscussionList discussions={discussions} />
			<Pagination discussionAmount={discussions.length} />
		</>
	)
}

export default ListComponent
