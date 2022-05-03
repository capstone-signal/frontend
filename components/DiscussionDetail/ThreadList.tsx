import { useState } from 'react'
import { useQuery } from 'react-query'
import { getThreadByReviewId, ReviewResponse } from '../../api/Review'
import Spinner from '../Common/Spinner'
import ThreadWriteForm from './ThreadWriteForm'

type Props = {
	review: ReviewResponse
}

const ThreadList: React.FC<Props> = ({ review }) => {
	const [isToggled, setToggled] = useState<boolean>(false)
	const [page, setPage] = useState<number>(0)
	const { data, error, isLoading } = useQuery(
		[`thread${review.id}`, review.id],
		() => getThreadByReviewId(review.id, page),
		{
			enabled: isToggled
		}
	)

	const handleClickEnabledBtn = () => {
		setToggled(true)
	}

	return (
		<div className="flex-col">
			<div className="thread_header flex border-2 p-2">
				<div className="basis-1/3">
					<div
						className="p-6 flex justify-start cursor-pointer text-success"
						onClick={handleClickEnabledBtn}
					>
						쓰레드
						{!isToggled && <span className="ml-2">더보기..</span>}
					</div>
				</div>
				<div className="thread_write basis-2/3 flex justify-center items-center">
					<ThreadWriteForm reviewId={review.id} />
				</div>
			</div>
			{isLoading && <Spinner />}
			{error && <div>Error</div>}
			<div className="p-6">
				{data?.content.map((thread) => {
					return <div key={thread.id}>{thread.content}</div>
				})}
			</div>
		</div>
	)
}

export default ThreadList
