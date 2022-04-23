import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../../components/layout/layout'
import CreateDiscussionComponent from '../../components/createDiscussion/CreateDiscussionComponent'

const createDiscussion: NextPage = () => {
	return (
		<div>
			<Head>
				<title>Create Next App</title>
			</Head>
			<Layout>
				<div className="m-3 min-h-[36rem]">
					<CreateDiscussionComponent />
				</div>
			</Layout>
		</div>
	)
}

export default createDiscussion
