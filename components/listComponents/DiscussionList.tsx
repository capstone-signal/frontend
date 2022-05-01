import { useState } from 'react'
import { DiscussionState, LiveReviewAvailableTime } from '../../api/Discussion'
import DiscussionBox from './DiscussionBox'

type Props = {
	discussions: {
		id: number
		title: string
		question: string
		state: DiscussionState
		//tags: TagResponse[]
		//user: UserResponse
	}[]
}

const DiscussionList: React.FunctionComponent<Props> = () => {
	const discussions = [
		{
			id: 1,
			title: '1번 discussion',
			question: 'OOO에 대한 질문이 있습니다.',
			state: 0
		}
	]
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
