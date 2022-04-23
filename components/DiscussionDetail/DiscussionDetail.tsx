import { DiscussionResponse } from '../../api/Discussion'

type Props = {
	discussion: DiscussionResponse
}
const DiscussionDetail: React.FC<Props> = ({ discussion }) => {
	return <div>{discussion.question}</div>
}

export default DiscussionDetail
