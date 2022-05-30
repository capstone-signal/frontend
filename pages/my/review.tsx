import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../../components/layout/layout'
import MyReview from '../../components/MyPage/MyReview'

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {}

const MyReviewPage: NextPage<Props> = () => {
	return (
		<div>
			<Head>
				<title>나의 Reviews</title>
			</Head>
			<Layout>
				<div className="m-3 min-h-[36rem]">
					<MyReview />
				</div>
			</Layout>
		</div>
	)
}

export default MyReviewPage
