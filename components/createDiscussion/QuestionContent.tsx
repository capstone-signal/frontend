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
		<div className="h-full">
			<div className="text-xl mb-2 ml-2">질문 내용을 작성하세요</div>
			<MarkdownEditor
				height={450}
				className="input input-bordered w-full m-2 h-full"
				value={question}
				onChange={(value) => handleChangeQuestion(value)}
			/>
		</div>
	)
}

export default QuestionContent
