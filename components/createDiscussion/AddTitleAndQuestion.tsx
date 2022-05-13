import QuestionContent from './QuestionContent'

const AddTitleAndQuestion = ({
	title,
	setTitle,
	question,
	setQuestion
}: {
	title: any
	setTitle: any
	question: any
	setQuestion: any
}) => {
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
				<QuestionContent question={question} setQuestion={setQuestion} />
			</div>
		</div>
	)
}

export default AddTitleAndQuestion
