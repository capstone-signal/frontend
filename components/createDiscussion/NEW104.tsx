import { useState } from 'react'
import DirectCodeCompoent from './DirectCodeCompoent'
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

const CAPS104: React.FunctionComponent<Props> = () => {
	const [discussionType, setDiscussionType] = useState<
		'DIRECT' | 'COMMIT' | 'PR'
	>('DIRECT')
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
				<div className="text-xl mb-2">Create a new discussion</div>
				<div className="m-2">
					<div className="btn btn-ghost w-[12rem]" onClick={selectDirect}>
						직접 코드 작성하기
					</div>
					<div className="btn btn-ghost w-[15rem]" onClick={selectPRorCommit}>
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

export default CAPS104
