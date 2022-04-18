import { useState } from 'react'
import DirectCode from './DirectCode'
import PRorCommit from './PRorCommit'

type Props = Record<string, any>

const CAPS104: React.FunctionComponent<Props> = () => {
	const [discussionType, setDiscussionType] = useState<
		'DIRECT' | 'COMMIT' | 'PR'
	>('DIRECT')

	const selectDirect = () => {
		setDiscussionType('DIRECT')
	}
	const selectPRorCommit = () => {
		setDiscussionType('PR')
	}

	return (
		<div>
			<div className="text-xl mb-2">Create a new discussion</div>
			<div className="btn btn-ghost" onClick={selectDirect}>
				직접 코드 작성하기
			</div>
			<div className="btn btn-ghost" onClick={selectPRorCommit}>
				GitHub에서 코드 가져오기
			</div>
			{discussionType === 'DIRECT' && <DirectCode />}
			{discussionType === 'PR' && <PRorCommit />}
		</div>
	)
}

export default CAPS104
