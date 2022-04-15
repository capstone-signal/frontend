import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/layout/layout'
import CAPS104 from '../components/CAPS104'
//import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
	return (
		<div>
			<Head>
				<title>Create Next App</title>
			</Head>
			<Layout>
				<button className="btn btn-primary">hello</button>
				<CAPS104 />
			</Layout>
		</div>
	)
}

export default Home
