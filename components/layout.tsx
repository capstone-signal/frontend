import Header from './header'
import Footer from './footer'
import Sidebar from './sidebar'

interface LayoutProps {
	children: React.ReactNode
}

function Layout({ children }: LayoutProps) {
	return (
		<>
			<Header />
			<div className="flex flew-row">
				<Sidebar />
				<main className="w-full">{children}</main>
			</div>
			<Footer />
		</>
	)
}

export default Layout
