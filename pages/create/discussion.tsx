import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../../components/layout/layout'
import CAPS104 from '../../components/CAPS104'
import NEW104 from '../../components/createDiscussion/NEW104'
import LiveReviewCalendar from '../../components/LiveReviewReservation/LiveReviewCalendar'

const createDiscussion: NextPage = () => {
	return (
		<div>
			<Head>
				<title>Create Next App</title>
			</Head>
			<Layout>
				<div className="m-3 min-h-[36rem]">
					<NEW104 />
					{/*<CAPS104 />*/}
					<LiveReviewCalendar />
				</div>
			</Layout>
		</div>
	)
}

export default createDiscussion
