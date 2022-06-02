import { getDiscussions } from '../../api/Discussion'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import Spinner from '../Common/Spinner'
import Pagination from '../listComponents/Pagination'
import DiscussionList from '../listComponents/DiscussionList'

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {}

const MyDiscussion: React.FunctionComponent<Props> = () => {
	const router = useRouter()
	const { page, onlyMine } = router.query
	const {
		data: discussions,
		isLoading,
		isError
	} = useQuery(`discussions?page=${page}&onlyMine=${onlyMine}`, () =>
		getDiscussions({ page, onlyMine: 'true' })
	)
	return (
		<>
			<div className="font-bold mb-4 pt-1 pl-3 pb-3 text-lg border-b-2 border-solid border-gray-400">
				내가 작성한 Discussion
			</div>
			{isLoading || isError ? (
				<Spinner />
			) : (
				<DiscussionList discussions={discussions?.content} />
			)}
			<Pagination
				discussionAmount={discussions?.totalElements}
				urlFrom={'my/discussion'}
				onlyMine={'true'}
			/>
		</>
	)
}

export default MyDiscussion
