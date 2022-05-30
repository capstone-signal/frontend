import React, { FunctionComponent } from 'react'
import Link from 'next/link'
import { signOut } from '../../api/User'
import ReviewAvailable from '../LiveReviewReservation/ReviewAvailable'
import { useUserId } from '../../hooks/useUserId'
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface HeaderProps {}

const Header: FunctionComponent<HeaderProps> = () => {
	const { isLoggedIn } = useUserId()
	const onLinkClick = () => {
		window.location.href = '/create/discussion'
	}
	return (
		<div className="navbar bg-base-100 border-b-2 min-w-[65rem]">
			<div className="flex-1">
				<Link href="/">
					<a className="btn btn-ghost normal-case text-xl">HiDiscuss</a>
				</Link>
			</div>
			<div className="navbar-end">
				{isLoggedIn && <ReviewAvailable />}
				{isLoggedIn ? (
					<div className="flex flex-row justify-center">
						<button
							className="btn bg-primary mr-2 normal-case"
							onClick={onLinkClick}
						>
							Create a Discussion
						</button>
						<div className="dropdown dropdown-end">
							<button className="btn btn-ghost btn-circle">
								<div className="indicator">
									<span className="badge badge-xs badge-primary indicator-item"></span>
								</div>
							</button>
							<ul className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-36 mt-4">
								<li>
									<Link passHref href="/my/discussion">
										<button>My Discussions</button>
									</Link>
								</li>
								<li>
									<Link passHref href="/my/review">
										<button>My Reviews</button>
									</Link>
								</li>
								<li>
									<Link passHref href="/">
										<button onClick={signOut}>Sign Out</button>
									</Link>
								</li>
							</ul>
						</div>
					</div>
				) : (
					<Link href="/api/oauth2/authorization/github" passHref>
						<button className="btn btn-primary">sign in</button>
					</Link>
				)}
			</div>
		</div>
	)
}

export default Header
