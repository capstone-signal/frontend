import { DiscussionResponse } from '../../api/Discussion'
import Spinner from '../Common/Spinner'
import DiscussionBox from './DiscussionBox'

type Props = {
	discussions: DiscussionResponse[] | undefined
}

const DiscussionList: React.FunctionComponent<Props> = ({ discussions }) => {
	const onBoxClick = (id: number) => {
		window.location.href = `/discussion/${id}`
	}
	return (
		<div className="min-h-[30rem]">
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
		</div>
	)
}

export default DiscussionList
