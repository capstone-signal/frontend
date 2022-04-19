import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../../components/layout/layout'
import NEW104 from '../../components/createDiscussion/NEW104'

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
				</div>
			</Layout>
		</div>
	)
}

export default createDiscussion
