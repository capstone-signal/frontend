import { useState } from 'react'
import { DiscussionState, LiveReviewAvailableTime } from '../../api/Discussion'

type Props = {
	discussion: {
		id: number
		title: string
		question: string
		state: DiscussionState
		//tags: TagResponse[]
		//user: UserResponse
	}
}

const DiscussionBox: React.FunctionComponent<Props> = ({ discussion }) => {
	return (
		<div className="w-full bg-red-200">
			<div>{discussion.title}</div>
		</div>
	)
}

export default DiscussionBox
