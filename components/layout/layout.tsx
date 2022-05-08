import React, { FunctionComponent } from 'react'
import Header from './header'
import Footer from './footer'
import Sidebar from './sidebar'

interface LayoutProps {
	children: React.ReactNode
}

const Layout: FunctionComponent<LayoutProps> = (props) => (
	<>
		<Header />
		<div className="flex flex-row justify-center w-full min-w-[65rem] bg-base-300">
			<Sidebar />
			<main className="min-w-[50rem] max-w-[80rem] w-[calc(100%-15rem)]">
				{props.children}
			</main>
		</div>
		<Footer />
	</>
)

export default Layout
