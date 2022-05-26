import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../../components/layout/layout'

const MyReviewPage: NextPage = () => {
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

export default MyReviewPage
