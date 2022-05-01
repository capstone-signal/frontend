import { useState } from 'react'
import DiscussionList from './DiscussionList'
import ListFilter from './ListFilter'

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {}

const ListComponent: React.FunctionComponent<Props> = () => {
	const discussions = [
		{
			id: 1,
			title: '1번 discussion',
			question: 'OOO에 대한 질문이 있습니다.',
			state: 0
		}
	]
	return (
		<>
			<ListFilter />
			<DiscussionList discussions={discussions} />
		</>
	)
}

export default ListComponent
