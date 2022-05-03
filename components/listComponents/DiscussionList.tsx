import { useState } from 'react'
import { DiscussionState, LiveReviewAvailableTime } from '../../api/Discussion'
import DiscussionBox from './DiscussionBox'

type Props = {
	discussions: {
		id: number
		title: string
		reviewee: string
		question: string
		state: DiscussionState
		//tags: TagResponse[]
		//user: UserResponse
	}[]
}

const DiscussionList: React.FunctionComponent<Props> = ({ discussions }) => {
	return (
		<div>
			{discussions.map((discussion, index) => (
				<div key={index}>
					<DiscussionBox discussion={discussion} />
				</div>
			))}
		</div>
	)
}

export default DiscussionList
