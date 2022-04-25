import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/layout/layout'
import Link from 'next/link'
//import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
	return (
		<div>
			<Head>
				<title>Create Next App</title>
			</Head>
			<Layout>
				<button className="btn btn-primary">hello</button>
				<Link href="/create/discussion" passHref>
					<button className="btn btn-secondary">create a discussion</button>
				</Link>
			</Layout>
		</div>
	)
}

export default Home
