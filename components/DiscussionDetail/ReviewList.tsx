import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import {
	DiscussionCodeResponse,
	DiscussionResponse
} from '../../api/Discussion'
import { getReviewByDiscussionId } from '../../api/Review'
import Spinner from '../Common/Spinner'
import ReviewDetail from './Review'

type Props = {
	discussion: DiscussionResponse
	discussionCodes: DiscussionCodeResponse[]
	handleClickReview: (reviewId: number) => void
	selectedReviewIds: number[]
	isCompletePhase: boolean
}
const ReviewList: React.FC<Props> = ({ discussion, discussionCodes }) => {
	// get reviews using page query
	const [page, setPage] = useState<number>(1)
	const { isLoading, isError, data } = useQuery(
		['reviews', page, discussion.id],
		() => getReviewByDiscussionId(discussion.id, page),
		{
			keepPreviousData: false
		}
	)
	const [availablePages, setAvailablePages] = useState<number[]>([])

	useEffect(() => {
		const totalPages = data?.totalPages || 1

		const pages: number[] = []
		for (let i = 1; i <= totalPages; i++) {
			pages.push(i)
		}
		setAvailablePages(pages)
	}, [data?.totalPages, page])

	const handleClickPage = (selectedPage: number) => {
		if (selectedPage === page) return
		setPage(selectedPage)
	}

	if (isLoading) return <Spinner />
	if (isError) return <div>Error</div>

	return (
		<div className="flex flex-col">
			<div className="border-t-2 my-10">
				{data?.content.map((review) => {
					return (
						<ReviewDetail
							review={review}
							key={review.id}
							discussionCodes={discussionCodes}
						/>
					)
				})}
			</div>
			<div className="flex justify-center">
				{availablePages.map((availablePage) => {
					return (
						<button
							key={availablePage}
							className={`px-4 py-2 mx-2 rounded-full ${
								page === availablePage ? 'btn-primary' : ''
							}`}
							onClick={() => handleClickPage(availablePage)}
						>
							{availablePage}
						</button>
					)
				})}
			</div>
		</div>
	)
}

export default ReviewList
