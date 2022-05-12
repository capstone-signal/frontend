import React, { useState } from 'react'
import { MarkdownEditor } from './MarkdownEditor'

type Props = {
	question: string
	setQuestion: (value: string) => void
}

const QuestionContent: React.FunctionComponent<Props> = ({
	question,
	setQuestion
}) => {
	const handleChangeQuestion = (value: string | undefined) => {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		setQuestion(value!)
	}
	return (
		<div>
			<div className="text-xl mb-2 ml-2">질문 내용을 작성하세요</div>
			<MarkdownEditor
				className="input input-bordered w-full max-w-[40rem] m-2"
				value={question}
				onChange={(value) => handleChangeQuestion(value)}
			/>
		</div>
	)
}

export default QuestionContent
