import { GetServerSidePropsContext, NextPage } from 'next'
import Head from 'next/head'
import { DiscussionResponse, getDiscussionById } from '../../api/Discussion'
import DiscussionDetail from '../../components/DiscussionDetail/DiscussionDetail'
import ReviewList from '../../components/DiscussionDetail/ReviewList'
import Layout from '../../components/layout/layout'

type Props = {
	discussion: DiscussionResponse
}

const DiscussionDetailPage: NextPage<Props> = ({ discussion }) => {
	return (
		<div>
			<Head>
				<title>{discussion.question}</title>
			</Head>
			<Layout>
				<div className="m-3 min-h-[36rem]">
					<DiscussionDetail discussion={discussion} />
					<ReviewList discussion={discussion} />
				</div>
			</Layout>
		</div>
	)
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	const discussionId = parseInt(ctx.params?.id as string)
	if (isNaN(discussionId)) {
		return {
			redirect: {
				permanet: false,
				destination: '/500'
			}
		}
	}

	const discussion = await getDiscussionById(discussionId)
	if (!discussion) {
		return {
			redirect: {
				permanet: false,
				destination: '/404'
			}
		}
	}

	return {
		props: {
			discussion
		}
	}
}
export default DiscussionDetailPage
