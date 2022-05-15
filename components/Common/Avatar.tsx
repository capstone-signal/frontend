type Props = {
	username: string
	activated?: boolean
}

const Avatar: React.FC<Props> = ({ username, activated = false }) => {
	return (
		<div className="avatar placeholder flex items-center my-4">
			<div
				className={`${
					activated ? 'bg-success' : 'bg-neutral-focus'
				} text-neutral-content rounded-full w-8`}
			>
				<span className="text-2xl">{username[0]}</span>
			</div>
			<span className="text ml-2">{username}</span>
		</div>
	)
}

export default Avatar
