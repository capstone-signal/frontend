import type {
	GetServerSideProps,
	GetServerSidePropsContext,
	NextPage
} from 'next'
import Head from 'next/head'
import { DiscussionListResponse, getDiscussions } from '../../api/Discussion'
import Layout from '../../components/layout/layout'

type Props = {
	discussions: DiscussionListResponse
}

const MyDiscussionPage: NextPage<Props> = ({ discussions }) => {
	console.log(discussions)
	return (
		<div>
			<Head>
				<title>Create Next App</title>
			</Head>
			<Layout>
				<div className="m-3 min-h-[36rem]">
					<div>hello</div>
				</div>
			</Layout>
		</div>
	)
}

export const getServerSideProps: GetServerSideProps<Props> = async (
	context: GetServerSidePropsContext
) => {
	const { page, tags, state, keyword, sort, onlyMine } = context.query
	const discussions = await getDiscussions({
		page: page,
		tags: tags,
		state: state,
		keyword: keyword,
		sort: sort,
		onlyMine: onlyMine
	})
	return {
		props: {
			discussions: discussions
		}
	}
}

export default MyDiscussionPage
