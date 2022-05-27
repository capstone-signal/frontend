import { DiscussionResponse } from '../../api/Discussion'
import Link from 'next/link'
import Spinner from '../Common/Spinner'
import DiscussionBox from './DiscussionBox'

type Props = {
	discussions: DiscussionResponse[] | undefined
}

const DiscussionList: React.FunctionComponent<Props> = ({ discussions }) => {
	return (
		<div className="min-h-[30rem]">
			{typeof discussions != undefined ? (
				<div>
					{discussions?.map((discussion, index) => (
						<Link href={`/discussion/${discussion.id}`} key={index}>
							<a>
								<DiscussionBox discussion={discussion} />
							</a>
						</Link>
					))}
				</div>
			) : (
				<Spinner />
			)}
		</div>
	)
}

export default DiscussionList
