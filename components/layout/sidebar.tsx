import React, { FunctionComponent } from 'react'
import Link from 'next/link'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SidebarProps {}

const Sidebar: FunctionComponent<SidebarProps> = () => (
	<div className="w-[15rem] h-[32rem] bg-base-200 px-1">
		<ul className="relative">
			<li className="relative">
				<Link href="/">
					<a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-300 transition duration-300 ease-in-out">
						Home
					</a>
				</Link>
			</li>
			<li className="relative">
				<Link href="/list?page=1">
					<a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-300 transition duration-300 ease-in-out">
						Discussions
					</a>
				</Link>
			</li>
			<li className="relative">
				<a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-300 transition duration-300 ease-in-out">
					Reward
				</a>
			</li>
		</ul>
	</div>
)

export default Sidebar
