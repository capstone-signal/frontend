import React, { useState } from 'react'
import {
	createDiscussion,
	DirectCode,
	LiveReviewAvailableTime
} from '../../api/Discussion'
import SelectTagComponent from './SelectTagComponent'
import { mergeAvailableTimes } from '../../utils/mergeAvailableTimes'
import { useRouter } from 'next/router'
import AddDiscussionCode from './AddDiscussionCode'
import AddTitleAndQuestion from './AddTitleAndQuestion'
import ReceiveLiveReview from './ReceiveLiveReview'
import GuideLineChecker from './GuideLineChecker'

type Props = Record<string, any>

const GuideLines = {
	question: [
		'코드가 어떤 작업을 수행하는지 간략하게 요약해서 설명해주세요.',
		'코드가 잘 동작하지 않는다면, 무슨 문제가 있는지 설명해주세요.',
		'코드를 잘 동작시키기 위해 어떤 시도를 했는지 설명해주세요.',
		'질문을 작성해주세요.'
	],
	code: ['한 discussion에 올리는 코드는 300-400줄 규모로 유지해주세요.'],
	tag: ['코드를 충분히 표현할 수 있는 태그를 달아주세요.']
}

const CreateDiscussionComponent: React.FunctionComponent<Props> = () => {
	const router = useRouter()
	const [discussionType, setDiscussionType] = useState<
		'DIRECT' | 'COMMIT' | 'PR'
	>('DIRECT')
	const [title, setTitle] = useState<string>('')
	const [questions, setQuestions] = useState<string[]>(
		new Array(GuideLines.question.length).fill('')
	)
	const [selectedTagIds, setSelectedTagIds] = useState<number[]>([])
	const [liveReviewRequired, setLiveReviewRequired] = useState<boolean>(false)
	const [liveReviewAvailableTimes, setLiveReviewAvailableTimes] = useState<
		LiveReviewAvailableTime[]
	>([])
	const [codes, setCodes] = useState<DirectCode[]>([])
	const [selectedRepo, setSelectedRepo] = useState<number>(-1)
	const [selectedGitNode, setSelectedGitNode] = useState<string>('')
	const [availableTimes, setAvailableTimes] = useState<
		LiveReviewAvailableTime[]
	>([])
	const [progress, setProgress] = useState<number>(0)

	const onBeforeBtnClick = () => {
		if (progress === 0) {
			return
		}
		setProgress(progress - 1)
	}

	const onNextBtnClick = async (e: React.FormEvent) => {
		e.preventDefault()

		if (
			progress === 0 &&
			(title === '' || questions[questions.length - 1] === '')
		) {
			alert('제목과 질문 내용을 모두 작성해주세요.')
			return
		}
		if (progress === 1 && discussionType === 'DIRECT') {
			if (codes.length === 0) {
				alert('코드를 입력해주세요.')
				return
			}
			if (codes.some((code) => code.content === '')) {
				alert('코드를 입력해주세요.')
				return
			}
		}

		if (
			(progress === 1 && discussionType === 'PR') ||
			discussionType === 'COMMIT'
		) {
			if (selectedRepo === -1) {
				alert('저장소를 선택해주세요.')
				return
			}
			if (selectedGitNode === '') {
				alert('PR 또는 Commit을 선택해주세요.')
				return
			}
		}

		if (progress === 2 && liveReviewRequired) {
			if (liveReviewAvailableTimes.length === 0) {
				alert('가능한 시간대를 최소 1개 이상 입력해주세요.')
				return
			} else {
				setAvailableTimes(mergeAvailableTimes(liveReviewAvailableTimes))
			}
		}
		setProgress(progress + 1)
	}

	const onCreateBtnClick = async (e: React.FormEvent) => {
		if (selectedTagIds.length === 0) {
			alert('태그를 선택해주세요.')
			return
		}
		try {
			const discussion = await createDiscussion({
				title,
				discussionType,
				question: '', // todo
				tagIds: selectedTagIds,
				liveReviewRequired,
				liveReviewAvailableTimes: {
					times: availableTimes
				},
				codes,
				usePriority: false,
				gitRepositoryId: discussionType !== 'DIRECT' ? selectedRepo : undefined,
				gitNodeId: discussionType !== 'DIRECT' ? selectedGitNode : undefined
			})
			alert('생성이 완료되었습니다.')
			router.push(`/discussion/${discussion.id}`)
		} catch (e) {
			console.error(e)
			alert("can't create discussion.")
		}
	}

	return (
		<div className="flex flex-col w-100 items-center h-full">
			<ul className="steps mb-10">
				{['질문 작성', '코드 작성', '라이브 리뷰', '태그 선택'].map(
					(step, index) => (
						<li
							key={index}
							className={`step ${progress >= index ? 'step-primary' : ''}`}
						>
							{step}
						</li>
					)
				)}
			</ul>
			{progress === 0 && (
				<AddTitleAndQuestion
					title={title}
					setTitle={setTitle}
					questions={questions}
					setQuestions={setQuestions}
					questionTitles={GuideLines.question}
				/>
			)}
			{progress === 1 && (
				<AddDiscussionCode
					discussionType={discussionType}
					codes={codes}
					setCodes={setCodes}
					setDiscussionType={setDiscussionType}
					selectedRepo={selectedRepo}
					setSelectedRepo={setSelectedRepo}
					selectedGitNode={selectedGitNode}
					setSelectedGitNode={setSelectedGitNode}
				/>
			)}
			{progress === 2 && (
				<ReceiveLiveReview
					liveReviewRequired={liveReviewRequired}
					setLiveReviewRequired={setLiveReviewRequired}
					liveReviewAvailableTimes={liveReviewAvailableTimes}
					setLiveReviewAvailableTimes={setLiveReviewAvailableTimes}
				/>
			)}
			{progress === 3 && (
				<div>
					<SelectTagComponent
						selectedTagIds={selectedTagIds}
						setSelectedTagIds={setSelectedTagIds}
					/>
					<GuideLineChecker
						guideLines={GuideLines}
						isSatisfieds={{
							question: questions.map((q) => q !== ''),
							code: [
								codes.reduce((acc, code) => acc + code.content.length, 0) < 400
							],
							tag: [selectedTagIds.length > 0]
						}}
					/>
				</div>
			)}
			<div className="flex mt-10">
				{progress !== 0 && (
					<button
						onClick={onBeforeBtnClick}
						type="submit"
						className="btn btn-dark mr-6"
					>
						이전 단계로
					</button>
				)}
				{progress !== 3 && (
					<button
						onClick={onNextBtnClick}
						type="submit"
						className="btn btn-dark"
					>
						다음 단계로 ({progress + 1}/4)
					</button>
				)}
				{progress === 3 && (
					<button
						onClick={onCreateBtnClick}
						type="submit"
						className="btn btn-dark"
					>
						Discussion 생성
					</button>
				)}
			</div>
		</div>
	)
}

export default CreateDiscussionComponent
