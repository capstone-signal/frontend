import { useState } from 'react'
import { DiscussionState, LiveReviewAvailableTime } from '../../api/Discussion'

type Props = {
	discussion: {
		id: number
		title: string
		reviewee: string
		question: string
		state: DiscussionState
		//tags: TagResponse[]
		//user: UserResponse
	}
}

const DiscussionBox: React.FunctionComponent<Props> = ({ discussion }) => {
	return (
		<div className="w-full bg-red-200 rounded-xl h-[7rem] p-3 mb-4">
			<div className="flex flex-row justify-between">
				<div className="font-bold">{discussion.title}</div>
				<div className="w-">{discussion.reviewee}</div>
			</div>
			<div>{discussion.question}</div>
		</div>
	)
}

export default DiscussionBox
