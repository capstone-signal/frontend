import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/layout/layout'
import ListFilter from '../components/listComponents/ListFilter'

const list: NextPage = () => {
	return (
		<div>
			<Head>
				<title>Create Next App</title>
			</Head>
			<Layout>
				<div className="m-3 min-h-[36rem]">
					<ListFilter />
					{/* list component />*/}
				</div>
			</Layout>
		</div>
	)
}

export default list
