import type { NextPage } from 'next'
import Image from 'next/image'
import Head from 'next/head'
import Layout from '../components/layout/layout'
import LandingImage1 from '../public/landing_image1.png'
import LandingImage2 from '../public/landing_image2.png'
import LandingImage3 from '../public/landing_image3.png'
import ReviewAvailable from '../components/LiveReviewReservation/ReviewAvailable'

const Home: NextPage = () => {
	return (
		<div>
			<Head>
				<title>Hidiscuss</title>
			</Head>
			<Layout>
				<div className="p-4 flex flex-col justify-center">
					<div className="w-[100%] rounded-2xl overflow-hidden mb-4">
						<Image
							src={LandingImage1}
							alt="landing_img"
							layout="responsive"
							objectFit="cover"
							className="flex"
						/>
					</div>
					<div className="flex flex-row justify-between mb-2">
						<div className="w-[calc(50%-0.5rem)] rounded-2xl overflow-hidden">
							<Image
								src={LandingImage2}
								alt="landing_img"
								layout="responsive"
								objectFit="cover"
								className="flex"
							/>
						</div>
						<div className="w-[calc(50%-0.5rem)] rounded-2xl overflow-hidden">
							<Image
								src={LandingImage3}
								alt="landing_img"
								layout="responsive"
								objectFit="cover"
								className="flex"
							/>
						</div>
					</div>
				</div>
			</Layout>
		</div>
	)
}

export default Home
