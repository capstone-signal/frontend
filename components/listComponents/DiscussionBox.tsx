import { DiscussionResponse } from '../../api/Discussion'
import { DiscussionState } from '../../api/Discussion'
import dayjs from 'dayjs'

type Props = {
	discussion: DiscussionResponse
}

const DiscussionBox: React.FunctionComponent<Props> = ({ discussion }) => {
	return (
		<div className="w-full bg-red-200 rounded-xl min-h-[7rem] p-3 mb-4 flex flex-col justify-between overflow-y-visible">
			<div className="flex flex-row justify-between">
				<span className="font-bold w-[80%] min-h-[4rem]">
					{discussion.title}
				</span>
				<div className="flex flex-col items-end">
					<span className="font-semibold mb-1">{discussion.user.name}</span>
					<span className="text-sm mb-1">
						{dayjs(discussion.createdAt).format('YYYY/MM/DD hh:mm A')}
					</span>
					{discussion.state === DiscussionState.NOT_REVIEWED && (
						<div>Not Reviewed</div>
					)}
					{discussion.state === DiscussionState.REVIEWING && (
						<div>Reviewing</div>
					)}
					{discussion.state === DiscussionState.COMPLETED && (
						<div>Completed</div>
					)}
				</div>
			</div>
			<div className="flex flex-row overflow-x-auto overflow-y-hidden scroll">
				{discussion.tags.map((tag, index) => (
					<div
						className="btn btn-sm btn-disabled bg-white rounded-3xl text-sm text-black mr-2 min-w-[2.5rem] border-2 border-solid border-gray-300"
						key={index}
					>
						{tag.name}
					</div>
				))}
			</div>
		</div>
	)
}

export default DiscussionBox
