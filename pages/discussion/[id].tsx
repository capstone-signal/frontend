import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import {
	DiscussionCodeResponse,
	DiscussionResponse,
	getDiscussionById
} from '../../api/Discussion'
import DiscussionDetail from '../../components/DiscussionDetail/DiscussionDetail'
import ReviewList from '../../components/DiscussionDetail/ReviewList'
import Layout from '../../components/layout/layout'

type Props = {
	discussion: DiscussionResponse
	codes: DiscussionCodeResponse[]
}

const DiscussionDetailPage: NextPage<Props> = ({ discussion, codes }) => {
	const [selectedReviewIds, setSelectedReviewIds] = useState<number[]>([])
	const [isCompletePhase, setIsCompletePhase] = useState<boolean>(false)

	const handleClickReview = (reviewId: number) => {
		if (selectedReviewIds.includes(reviewId)) {
			setSelectedReviewIds(selectedReviewIds.filter((id) => id !== reviewId))
		} else {
			setSelectedReviewIds([...selectedReviewIds, reviewId])
		}
	}

	const handleClickCompletePhase = () => {
		setIsCompletePhase(true)
	}

	return (
		<div>
			<Head>
				<title>{discussion.title}</title>
			</Head>
			<Layout>
				<div className="m-3 min-h-[36rem]">
					<DiscussionDetail
						discussion={discussion}
						codes={codes}
						selectedReviewIds={
							selectedReviewIds /*TODO props로 안내려보내게 조정 */
						}
						isCompletePhase={isCompletePhase}
						handleClickCompletePhase={handleClickCompletePhase}
					/>
					<ReviewList
						discussion={discussion}
						selectedReviewIds={selectedReviewIds}
						handleClickReview={handleClickReview}
						isCompletePhase={isCompletePhase}
					/>
				</div>
			</Layout>
		</div>
	)
}

export const getServerSideProps: GetServerSideProps<Props> = async (
	ctx: GetServerSidePropsContext
) => {
	const discussionId = parseInt(ctx.params?.id as string)
	if (isNaN(discussionId)) {
		throw new Error('Invalid discussion id')
	}

	const discussion = await getDiscussionById(discussionId)
	if (!discussion) {
		throw new Error('Discussion not found')
	}
	return {
		props: {
			discussion: discussion.discussion,
			codes: discussion.codes
		}
	}
}
export default DiscussionDetailPage
