import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/layout/layout'
import ListComponent from '../components/listComponents/ListComponent'

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {}

const listPage: NextPage<Props> = () => {
	return (
		<div>
			<Head>
				<title>Create Next App</title>
			</Head>
			<Layout>
				<div className="m-3 min-h-[36rem]">
					<ListComponent />
				</div>
			</Layout>
		</div>
	)
}

export default listPage
