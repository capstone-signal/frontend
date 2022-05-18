import { useState } from 'react'
import QuestionContent from './QuestionContent'

const AddTitleAndQuestion = ({
	title,
	setTitle,
	questions,
	setQuestions,
	questionTitles
}: {
	title: string
	setTitle: any
	questions: string[]
	setQuestions: any
	questionTitles: string[]
}) => {
	const [questionProgress, setQuestionProgress] = useState<number>(0)

	const onBeforeBtnClick = (e: React.FormEvent) => {
		e.preventDefault()
		if (questionProgress > 0) {
			setQuestionProgress(questionProgress - 1)
		}
	}

	const onNextBtnClick = (e: React.FormEvent) => {
		e.preventDefault()
		if (questionProgress < questions.length - 1) {
			setQuestionProgress(questionProgress + 1)
		}
	}

	const hanedleChangeQuestion = (value: string) => {
		const newQuestions = [...questions]
		newQuestions[questionProgress] = value
		setQuestions(newQuestions)
	}

	return (
		<div className="w-full">
			<div className="title-container">
				<div className="text-xl mb-2 ml-4">제목을 입력하세요</div>
				<input
					type="text"
					placeholder="어떤 문제를 겪고 있는지 간결하게 소개해주세요"
					className="input input-bordered w-full m-2"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
			</div>
			<div className="question-container m-2 h-[30rem]">
				<QuestionContent
					key={questionProgress}
					question={questions[questionProgress]}
					setQuestion={hanedleChangeQuestion}
					title={questionTitles[questionProgress]}
					handleProgress={
						questionProgress < questions.length - 1 ? onNextBtnClick : undefined
					}
					handleBeforeProgress={
						questionProgress > 0 ? onBeforeBtnClick : undefined
					}
				/>
			</div>
		</div>
	)
}

export default AddTitleAndQuestion
