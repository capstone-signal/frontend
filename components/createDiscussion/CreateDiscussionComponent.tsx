import React, { useState } from 'react'
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
import { mergeAvailableTimes } from '../../utils/mergeAvailableTimes'
import { useRouter } from 'next/router'

type Props = Record<string, any>

const PutTitleAndQuestionComponent = ({title, setTitle, question, setQuestion}: {title:any, setTitle:any, question:any, setQuestion:any}) => {
	
	return (
	<div>
		<div className="text-xl mb-2 ml-4">제목을 입력하세요</div>
		<input
			type="text"
			placeholder="어떤 문제를 겪고 있는지 간결하게 소개해주세요"
			className="input input-bordered w-full max-w-[40rem] m-2"
			value={title}
			onChange={(e) => setTitle(e.target.value)}
		/>
		<div className="m-2">
			<QuestionContent question={question} setQuestion={setQuestion} />
		</div>
	</div>
	)
}

const PutDiscussionCodeComponent = ({discussionType, codes, setCodes, setDiscussionType} : {discussionType:any, codes:any, setCodes:any, setDiscussionType:any}) => {
	const selectDirect = () => {
		setDiscussionType('DIRECT')
	}
	const selectPRorCommit = () => {
		setDiscussionType('PR')
	}
	
	return (
		<div className="m-2">
			<div className="text-xl mb-2 ml-4">리뷰받을 코드를 어디에서 가져올까요?</div>
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
		</div>
	)
}

const ReceiveLiveReviewComponent = ({liveReviewRequired, setLiveReviewRequired, liveReviewAvailableTimes, setLiveReviewAvailableTimes} : {liveReviewRequired:any, setLiveReviewRequired:any, liveReviewAvailableTimes:any, setLiveReviewAvailableTimes:any}) => {

	const clickLiveReviewCheck = () => {
		setLiveReviewRequired(!liveReviewRequired)
	}

	return (
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
	)
}

const CreateDiscussionComponent: React.FunctionComponent<Props> = () => {
	const router = useRouter()
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
	const [availableTimes, setAvailableTimes] = useState<LiveReviewAvailableTime[]>([])
	const [progress, setProgress] = useState<number>(0)

	const validateCodes = () => {
		return true
	}

	const reset = () => {
		setTitle('')
		setQuestion('')
		setSelectedTagIds([])
		setLiveReviewRequired(false)
		setLiveReviewAvailableTimes([])
		setCodes([])
		setProgress(0)
	}

	const onNextBtnClick = async (e: React.FormEvent) => {
		e.preventDefault()
		if (progress === 1 && discussionType === 'DIRECT') {
			if (!validateCodes()) {
				alert('enter the code.')
				return
			}
		} else {
			// validate git info
		}

		if (progress === 2 && liveReviewRequired) {
			if (liveReviewAvailableTimes.length === 0) {
				alert('select the available time.')
				return
			} else {
				setAvailableTimes(mergeAvailableTimes(liveReviewAvailableTimes))
			}
		}
		setProgress(progress + 1)
	}

	const onCreateBtnClick = async (e: React.FormEvent) => {
		// create discussion
		try {
			const discussion = await createDiscussion({
				title,
				discussionType,
				question,
				tagIds: selectedTagIds,
				liveReviewRequired,
				liveReviewAvailableTimes: {
					times: availableTimes
				},
				codes,
				usePriority: false
			})
			alert('create discussion success.')
			router.push(`/discussion/${discussion.id}`)
		} catch (e) {
			console.error(e)
			alert("can't create discussion.")
		}
		reset()
	}
	

	return (
		<>
		{ progress === 0 && 
			<div>
				<PutTitleAndQuestionComponent
					title={title}
					setTitle={setTitle}
					question={question}
					setQuestion={setQuestion}
				/>
				<div className="float-right mx-2">
					<button onClick={onNextBtnClick} type="submit" className="btn btn-dark">
						다음 단계로 (1/4)
					</button>
				</div>
			</div> }
		{ progress === 1 && 
			<div>
				<PutDiscussionCodeComponent
					discussionType={discussionType}
					codes={codes}
					setCodes={setCodes}
					setDiscussionType={setDiscussionType}
				/>
				<button onClick={onNextBtnClick} type="submit" className="btn btn-dark">
					다음 단계로 (2/4)
				</button>
			</div> }
		{ progress === 2 &&
			<div>
				<div className="text-xl mb-2 ml-4">리뷰어와 더 원활하게 소통할 수 있는 Live Review는 어떠신가요?</div>
				<ReceiveLiveReviewComponent
					liveReviewRequired={liveReviewRequired}
					setLiveReviewRequired={setLiveReviewRequired}
					liveReviewAvailableTimes={liveReviewAvailableTimes}
					setLiveReviewAvailableTimes={setLiveReviewAvailableTimes}
				/>
				<button onClick={onNextBtnClick} type="submit" className="btn btn-dark">
					다음 단계로 (3/4)
				</button>
			</div> }
		{ progress === 3 && 
			<div>
				<div className="text-xl mb-2 ml-4">Discussion을 표현할 수 있는 태그를 선택해주세요</div>
				<SelectTagComponent
					selectedTagIds={selectedTagIds}
					setSelectedTagIds={setSelectedTagIds}
				/>
				<button onClick={onCreateBtnClick} type="submit" className="btn btn-secondary">
					Discussion 올리기
				</button>
			</div>
			}
		</>
	)
}

export default CreateDiscussionComponent