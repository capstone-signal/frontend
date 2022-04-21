import React, { useState, FunctionComponent } from 'react'
import Link from 'next/link'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface HeaderProps {}

const Header: FunctionComponent<HeaderProps> = () => {
	const [user, setUser] = useState<string>('')
	const signIn = () => {
		setUser('temp_user')
	}
	const signOut = () => {
		setUser('')
	}
	return (
		<div className="navbar bg-base-100 border-b-2">
			<div className="flex-1">
				<Link href="/">
					<a className="btn btn-ghost normal-case text-xl">HiDiscuss</a>
				</Link>
			</div>
			<div className="navbar-end">
				{user === '' && (
					<button onClick={signIn} className="btn btn-primary">
						sign in
					</button>
				)}
				{user != '' && (
					<div className="dropdown dropdown-end">
						<button className="btn btn-ghost btn-circle">
							<div className="indicator">
								<span className="badge badge-xs badge-primary indicator-item"></span>
							</div>
						</button>
						<ul className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-36 mt-4">
							<li onClick={signOut}>
								<a>Sign Out</a>
							</li>
						</ul>
					</div>
				)}
			</div>
		</div>
	)
}

export default Header
