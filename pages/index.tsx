import 'tailwindcss/tailwind.css'

import type { NextPage } from 'next'
import Head from 'next/head'
//import Image from 'next/image'
//import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
	return (
		<div>
			<Head>
				<title>Create Next App</title>
			</Head>
			<button className="btn">hello</button>
		</div>
	)
}

export default Home
