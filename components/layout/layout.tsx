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
		<div className="flex flew-row justify-center">
			<Sidebar />
			<main className="w-full min-w-[50rem] max-w-[80rem]">
				{props.children}
			</main>
		</div>
		<Footer />
	</>
)

export default Layout
