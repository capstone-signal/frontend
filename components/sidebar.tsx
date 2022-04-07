import React, { FunctionComponent } from 'react'

const Sidebar: FunctionComponent = () => (
	<div className="w-60 h-[32rem] bg-base-200 px-1">
		<ul className="relative">
			<li className="relative">
				<a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-300 transition duration-300 ease-in-out">
					Sidenav link 1
				</a>
			</li>
			<li className="relative">
				<a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-300 transition duration-300 ease-in-out">
					Sidenav link 2
				</a>
			</li>
			<li className="relative">
				<a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-300 transition duration-300 ease-in-out">
					Sidenav link 2
				</a>
			</li>
		</ul>
	</div>
)

export default Sidebar
