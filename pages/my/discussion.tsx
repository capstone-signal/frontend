import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../../components/layout/layout'
import MyDiscussion from '../../components/MyPage/MyDiscussion'

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {}

const MyDiscussionPage: NextPage<Props> = () => {
	return (
		<div>
			<Head>
				<title>나의 Discussions</title>
			</Head>
			<Layout>
				<div className="m-3 min-h-[36rem]">
					<MyDiscussion />
				</div>
			</Layout>
		</div>
	)
}

export default MyDiscussionPage
