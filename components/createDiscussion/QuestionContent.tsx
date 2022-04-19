import React, { useState } from 'react'

type Props = {
	question: string
	setQuestion: (value: string) => void
}

const QuestionContent: React.FunctionComponent<Props> = ({
	question,
	setQuestion
}) => {
	//const [question, setQuestion] = useState<string>('')
	return (
		<div>
			<textarea
				className="textarea textarea-primary w-[36rem] h-[12rem]"
				placeholder="Enter questions."
				onChange={(e) => setQuestion(e.target.value)}
			>
				{question}
			</textarea>
		</div>
	)
}

export default QuestionContent
