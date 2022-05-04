import type { NextPage } from 'next'
import Image from 'next/image'
import Head from 'next/head'
import Layout from '../components/layout/layout'
import Link from 'next/link'
import LandingImage from '../public/landing_image.png'

const Home: NextPage = () => {
	return (
		<div>
			<Head>
				<title>Create Next App</title>
			</Head>
			<Layout>
				<div className="p-4 flex flex-col justify-center">
					<div className="w-[100%] rounded-2xl overflow-hidden mb-4">
						<div className="absolute">
							<p>Freely make a discussion</p>
							<p>of your code!</p>
						</div>
						<Image
							src={LandingImage}
							alt="landing_img"
							layout="intrinsic"
							objectFit="cover"
						/>
					</div>
				</div>
			</Layout>
		</div>
	)
}

export default Home
