import type {
	GetServerSideProps,
	GetServerSidePropsContext,
	NextPage
} from 'next'
import Head from 'next/head'
import { DiscussionListResponse, getDiscussions } from '../api/Discussion'
import Layout from '../components/layout/layout'
import ListComponent from '../components/listComponents/ListComponent'

type Props = {
	discussions: DiscussionListResponse
}

const listPage: NextPage<Props> = ({ discussions }) => {
	return (
		<div>
			<Head>
				<title>Create Next App</title>
			</Head>
			<Layout>
				<div className="m-3 min-h-[36rem]">
					<ListComponent discussions={discussions} />
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
		page,
		tags,
		state,
		keyword,
		sort,
		onlyMine
	})
	if (!discussions) {
		throw new Error('Discussion not found')
	}
	return {
		props: {
			discussions: discussions
		}
	}
}
export default listPage
