import { useState } from 'react'
import DirectCodeCompoent from './DirectCodeComponent'
import PRorCommit from './PRorCommit'
import {
	createDiscussion,
	DirectCode,
	LiveReviewAvailableTime
} from '../../api/Discussion'
import QuestionContent from './QuestionContent'
import LiveReviewCalendar from '../LiveReviewReservation/LiveReviewCalendar'
import SelectTagComponent from './SelectTagComponent'

type Props = Record<string, any>

const CreateDiscussionComponent: React.FunctionComponent<Props> = () => {
	const [discussionType, setDiscussionType] = useState<
		'DIRECT' | 'COMMIT' | 'PR'
	>('DIRECT')
	const [title, setTitle] = useState<string>('')
	const [question, setQuestion] = useState<string>('')
	const [selectedTagIds, setSelectedTagIds] = useState<number[]>([])
	const [liveReviewRequired, setLiveReviewRequired] = useState<boolean>(false)
	const [liveReviewAvailableTimes, setLiveReviewAvailableTimes] = useState<
		LiveReviewAvailableTime[]
	>([])
	const [codes, setCodes] = useState<DirectCode[]>([])
	const validateCodes = () => {
		throw new Error('not implemented')
	}

	const reset = () => {
		throw new Error('not implemented')
	}
	const onCreateBtnClick = async (e: React.FormEvent) => {
		e.preventDefault()
		if (discussionType === 'DIRECT') {
			if (!validateCodes()) {
				alert('enter the code.')
				return
			}
		} else {
			// validate git info
		}

		// create discussion
		try {
			const discussion = await createDiscussion({
				discussionType,
				question,
				tagIds: selectedTagIds,
				liveReviewRequired,
				liveReviewAvailableTimes: {
					times: liveReviewAvailableTimes
				},
				codes,
				usePriority: false
			})
		} catch (e) {
			console.error(e)
			alert("can't create discussion.")
		}

		// reset
		reset()
	}
	const selectDirect = () => {
		setDiscussionType('DIRECT')
	}
	const selectPRorCommit = () => {
		setDiscussionType('PR')
	}
	const clickLiveReviewCheck = () => {
		setLiveReviewRequired(!liveReviewRequired)
	}
	return (
		<div>
			<form onSubmit={onCreateBtnClick} className="flex flex-col">
				<div className="text-xl mb-2 ml-2">Create a new discussion</div>
				<input
					type="text"
					placeholder="제목을 입력하세요"
					className="input input-bordered w-full max-w-[40rem] m-2"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<div className="m-2">
					<div
						className={`btn w-[12rem] ${
							discussionType == 'DIRECT' ? 'btn-accent' : 'btn-ghost'
						}`}
						onClick={selectDirect}
					>
						직접 코드 작성하기
					</div>
					<div
						className={`btn w-[15rem] ml-2 ${
							discussionType != 'DIRECT' ? 'btn-accent' : 'btn-ghost'
						}`}
						onClick={selectPRorCommit}
					>
						GitHub에서 코드 가져오기
					</div>
				</div>
				<div className="m-2">
					{discussionType === 'DIRECT' && (
						<DirectCodeCompoent codes={codes} setCodes={setCodes} />
					)}
					{(discussionType === 'PR' || discussionType === 'COMMIT') && (
						<PRorCommit
							discussionType={discussionType}
							setDiscussionType={setDiscussionType}
						/>
					)}
				</div>
				<div className="m-2">
					<QuestionContent question={question} setQuestion={setQuestion} />
				</div>
				<div className="flex flex-row items-center m-2">
					<input
						type="checkbox"
						className="checkbox mr-2"
						onClick={clickLiveReviewCheck}
					></input>
					<p className="mr-2">Live Review</p>
					<LiveReviewCalendar
						liveReviewRequired={liveReviewRequired}
						liveReviewAvailableTimes={liveReviewAvailableTimes}
						setLiveReviewAvailableTimes={setLiveReviewAvailableTimes}
					/>
				</div>
				<SelectTagComponent
					selectedTagIds={selectedTagIds}
					setSelectedTagIds={setSelectedTagIds}
				/>
				<div>
					<button type="submit" className="btn btn-secondary">
						생성
					</button>
				</div>
			</form>
		</div>
	)
}

export default CreateDiscussionComponent
