import type { NextPage } from 'next'
import Head from 'next/head'
import CAPS104 from '../components/CAPS104'
//import Image from 'next/image'
//import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
	return (
		<div>
			<Head>
				<title>Create Next App</title>
			</Head>
			<button className="btn btn-primary">hello</button>
			<CAPS104 />
		</div>
	)
}

export default Home
