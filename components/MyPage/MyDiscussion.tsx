import { useState } from 'react'
import { DiscussionFilter, getDiscussions } from '../../api/Discussion'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {}

const MyDiscussion: React.FunctionComponent<Props> = () => {
	const router = useRouter()
	const { page, tags, state, keyword, sort } = router.query
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
		getDiscussions({
			page: page,
			tags: tags,
			state: state,
			keyword: keyword,
			sort: sort,
			onlyMine: 'true'
		})
	)
	return (
		<>
			<div>hello</div>
			{discussions?.content.map((discussion, index) => (
				<div key={index}>{discussion.title}</div>
			))}
		</>
	)
}

export default MyDiscussion
