import type { NextPage } from 'next'
import Image from 'next/image'
import Head from 'next/head'
import Layout from '../components/layout/layout'
import Crown from '../public/crown.png'
import LandingImage1 from '../public/landing_image1.png'
import LandingImage2 from '../public/landing_image2.png'
import LandingImage3 from '../public/landing_image3.png'

const Home: NextPage = () => {
	const ranking_list = [
		{ color: 'bg-yellow-300', id: 'gildong_hong', point: 50000 },
		{ color: 'bg-slate-300', id: 'Steve_Park', point: 4000 },
		{ color: 'bg-yellow-600', id: 'helloworld', point: 3000 },
		{ color: 'bg-rose-600', id: 'rankingHunter', point: 2000 },
		{ color: 'bg-rose-600', id: 'bamboo703', point: 1100 }
	]
	return (
		<div>
			<Head>
				<title>Hidiscuss</title>
			</Head>
			<Layout>
				<div className="p-4 flex flex-col justify-center">
					<div className="flex flex-row justify-between mb-4">
						<div className="w-[75%] rounded-2xl overflow-hidden">
							<Image
								src={LandingImage1}
								alt="landing_img"
								layout="responsive"
								objectFit="cover"
								className="flex"
							/>
						</div>
						<div className="flex flex-col items-center w-[calc(25%-1rem)] p-4 bg-stone-50 rounded-2xl overflow-x-auto">
							<div className="flex flex-row justify-center mb-2 min-w-[15rem] w-[100%]">
								<Image src={Crown} alt="crown_img" width={20} height={10} />
								<span className="font-semibold text-lg">
									&nbsp;HiDiscuss 포인트 랭킹
								</span>
							</div>
							<table className="table table-compact">
								<tbody>
									{ranking_list.map((member, idx) => (
										<tr key={idx}>
											<td className="w-[2rem] text-center bg-transparent">
												<input
													className={`w-5 mask mask-star-2 ${member.color}`}
												/>
											</td>
											<td className="w-[7.5rem] text-center bg-transparent">
												{member.id}
											</td>
											<td className="w-[5rem] text-center bg-transparent">
												{member.point}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
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
