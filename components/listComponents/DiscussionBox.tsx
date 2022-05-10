import { DiscussionResponse } from '../../api/Discussion'

type Props = {
	discussion: DiscussionResponse
}

const DiscussionBox: React.FunctionComponent<Props> = ({ discussion }) => {
	return (
		<div className="w-full bg-red-200 rounded-xl h-[7rem] p-3 mb-4">
			<div className="flex flex-row justify-between">
				<div className="font-bold">{discussion.title}</div>
				<div className="w-">{discussion.user.name}</div>
			</div>
			<div>{discussion.question}</div>
			<div className="flex flex-row">
				{discussion.tags.map((tag, index) => (
					<div key={index}>{tag.name}</div>
				))}
			</div>
		</div>
	)
}

export default DiscussionBox
