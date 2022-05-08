import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import Head from 'next/head'
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
	return (
		<div>
			<Head>
				<title>{discussion.title}</title>
			</Head>
			<Layout>
				<div className="m-3 min-h-[36rem]">
					<DiscussionDetail discussion={discussion} codes={codes} />
					<ReviewList discussion={discussion} />
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
