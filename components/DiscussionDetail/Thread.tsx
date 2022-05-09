import dayjs from 'dayjs'
import { ThreadResponse } from '../../api/Review'

type Props = {
	thread: ThreadResponse
}
const Thread: React.FC<Props> = ({ thread }) => {
	return (
		<div className="mb-4 flex flex-col border-2 p-4 rounded-xl">
			<div className="profile flex justify-between">
				<div className="avatar placeholder flex items-center">
					<div className="bg-neutral-focus ring text-neutral-content rounded-full w-6 mr-2">
						<span className="text-l">{thread.user?.name[0]}</span>
					</div>
					<span className="text-l">{thread.user?.name}</span>
				</div>
				<div className="date font-bold">
					{dayjs(thread.createdAt).format('YY.MM.DD HH:mm')}
				</div>
			</div>
			<div className="content mt-4 break-all">
				<span>{thread.content}</span>
			</div>
		</div>
	)
}

export default Thread
