import { DiscussionResponse } from '../../api/Discussion'
import Spinner from '../Common/Spinner'
import DiscussionBox from './DiscussionBox'

type Props = {
	discussions: DiscussionResponse[] | undefined
}

const DiscussionList: React.FunctionComponent<Props> = ({ discussions }) => {
	const onBoxClick = (id: number) => {
		window.location.href = `discussion/${id}`
	}
	return (
		<>
			{typeof discussions != undefined ? (
				<>
					{discussions?.map((discussion, index) => (
						<div
							className="cursor-pointer"
							key={index}
							onClick={() => onBoxClick(discussion.id)}
						>
							<DiscussionBox discussion={discussion} />
						</div>
					))}
				</>
			) : (
				<Spinner />
			)}
		</>
	)
}

export default DiscussionList
