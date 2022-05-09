import { DiscussionResponse } from '../../api/Discussion'
import Spinner from '../Common/Spinner'
import DiscussionBox from './DiscussionBox'

type Props = {
	discussions: DiscussionResponse[] | undefined
}

const DiscussionList: React.FunctionComponent<Props> = ({ discussions }) => {
	return (
		<>
			{typeof discussions != undefined ? (
				<div>
					{discussions?.map((discussion, index) => (
						<div key={index}>
							<DiscussionBox discussion={discussion} />
						</div>
					))}
				</div>
			) : (
				<Spinner />
			)}
		</>
	)
}

export default DiscussionList
