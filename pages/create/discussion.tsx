import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../../components/layout/layout'
import CreateDiscussionComponent from '../../components/createDiscussion/CreateDiscussionComponent'
import { useUserId } from '../../hooks/useUserId'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const CreateDiscussion: NextPage = () => {
	const router = useRouter()
	const { init, isLoggedIn } = useUserId()

	useEffect(() => {
		if (!init) {
			return
		}
		if (!isLoggedIn) {
			alert('로그인 후 이용해주세요.')
			router.push('/')
		}
	}, [init, isLoggedIn, router])

	return (
		<div>
			<Head>
				<title>Discussion 추가</title>
			</Head>
			<Layout>
				<div className="m-3 min-h-[36rem]">
					<CreateDiscussionComponent />
				</div>
			</Layout>
		</div>
	)
}

export default CreateDiscussion
