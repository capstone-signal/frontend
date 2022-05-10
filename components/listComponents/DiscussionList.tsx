import { DiscussionResponse } from '../../api/Discussion'
import Link from 'next/link'
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
						<Link href={`/discussion/${discussion.id}`} passHref key={index}>
							<DiscussionBox discussion={discussion} />
						</Link>
					))}
				</div>
			) : (
				<Spinner />
			)}
		</>
	)
}

export default DiscussionList
