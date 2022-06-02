import { getMyReview } from '../../api/Discussion'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import Spinner from '../Common/Spinner'
import Pagination from '../listComponents/Pagination'
import DiscussionList from '../listComponents/DiscussionList'

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {}

const MyReview: React.FunctionComponent<Props> = () => {
	const router = useRouter()
	const { page } = router.query
	const {
		data: discussions,
		isLoading,
		isError
	} = useQuery(`discussion/myReview?page=${page}`, () => getMyReview({ page }))
	return (
		<>
			<div className="font-bold mb-4 pt-1 pl-3 pb-3 text-lg border-b-2 border-solid border-gray-400">
				내가 작성한 Review
			</div>
			{isLoading || isError ? (
				<Spinner />
			) : (
				<DiscussionList discussions={discussions?.content} />
			)}
			<Pagination
				discussionAmount={discussions?.totalElements}
				urlFrom={'my/review'}
				onlyMine={''}
			/>
		</>
	)
}

export default MyReview
