import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../../components/layout/layout'
import CAPS104 from '../../components/CAPS104'
//import styles from '../styles/Home.module.css'

const createDiscussion: NextPage = () => {
	return (
		<div>
			<Head>
				<title>Create Next App</title>
			</Head>
			<Layout>
				<div className="m-3 min-h-[36rem]">
					<div className="text-xl mb-2">Create a new discussion</div>
					<CAPS104 />
				</div>
			</Layout>
		</div>
	)
}

export default createDiscussion
