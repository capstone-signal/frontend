import React, { FunctionComponent } from 'react'

const Header: FunctionComponent = () => (
	<div className="navbar bg-base-100 border-b-2">
		<div className="flex-1">
			<a className="btn btn-ghost normal-case text-xl">HiDiscuss</a>
		</div>
		<div className="navbar-end">
			<button className="btn btn-ghost btn-circle">
				<div className="indicator">
					<span className="badge badge-xs badge-primary indicator-item"></span>
				</div>
			</button>
		</div>
	</div>
)

export default Header
