import { DirectCode } from '../../api/Discussion'
import DirectCodeComponent from './DirectCodeComponent'
import PRorCommit from './PRorCommit'

type Props = {
	discussionType: 'DIRECT' | 'COMMIT' | 'PR'
	setDiscussionType: any
	codes: DirectCode[]
	setCodes: any
	selectedRepo: number
	setSelectedRepo: any
	selectedGitNode: string
	setSelectedGitNode: any
}

const AddDiscussionCode: React.FC<Props> = ({
	discussionType,
	codes,
	setCodes,
	setDiscussionType,
	selectedRepo,
	setSelectedRepo,
	selectedGitNode,
	setSelectedGitNode
}) => {
	const selectDirect = () => {
		setDiscussionType('DIRECT')
	}
	const selectPRorCommit = () => {
		setDiscussionType('PR')
	}

	return (
		<div className="w-full">
			<div className="text-xl mb-6 ml-4">
				리뷰받을 코드를 어디에서 가져올까요?
			</div>
			<div className="flex w-full">
				<div className="flex flex-col">
					<div
						className={`btn w-[15rem] h-[10rem] ${
							discussionType == 'DIRECT' ? 'btn-accent' : 'btn-ghost'
						}`}
						onClick={selectDirect}
					>
						직접 작성하기
					</div>
					<div
						className={`btn w-[15rem] h-[10rem] ${
							discussionType != 'DIRECT' ? 'btn-accent' : 'btn-ghost'
						}`}
						onClick={selectPRorCommit}
					>
						GitHub에서 가져오기
					</div>
				</div>
				<div className="m-2 w-full">
					{discussionType === 'DIRECT' && (
						<DirectCodeComponent codes={codes} setCodes={setCodes} />
					)}
					{(discussionType === 'PR' || discussionType === 'COMMIT') && (
						<PRorCommit
							discussionType={discussionType}
							setDiscussionType={setDiscussionType}
							selectedRepo={selectedRepo}
							setSelectedRepo={setSelectedRepo}
							selectedGitNode={selectedGitNode}
							setSelectedGitNode={setSelectedGitNode}
						/>
					)}
				</div>
			</div>
		</div>
	)
}

export default AddDiscussionCode
