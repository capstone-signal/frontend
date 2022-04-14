import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/layout/layout'

//import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
	return (
		<div>
			<Head>
				<title>Create Next App</title>
			</Head>
			<Layout>
				<button className="btn btn-primary">hello</button>
			</Layout>
		</div>
	)
}

export default Home
