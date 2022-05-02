import React, { useEffect,useState, FunctionComponent } from 'react'
import Link from 'next/link'
import { isLogined,signOut } from '../../api/User'
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface HeaderProps {}

const Header: FunctionComponent<HeaderProps> = () => {
	
	return (
		<div className="navbar bg-base-100 border-b-2">
			<div className="flex-1">
				<Link href="/">
					<a className="btn btn-ghost normal-case text-xl">HiDiscuss</a>
				</Link>
			</div>
			<div className="navbar-end">
				{isLogined() ? (
					<div className="dropdown dropdown-end">
						<button className="btn btn-ghost btn-circle">
							<div className="indicator">
								<span className="badge badge-xs badge-primary indicator-item"></span>
							</div>
						</button>
						<ul className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-36 mt-4">
							<li>
								<Link href="/">
									<button onClick={signOut}>Sign Out</button>
								</Link>
							</li>
						</ul>
					</div>
				) : (
					<Link href='http://localhost:8080/oauth2/authorization/github' passHref>
						<button className="btn btn-primary">
							sign in
						</button>
					</Link>
				)}
			</div>
		</div>
	)
}

export default Header
