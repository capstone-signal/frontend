import React, { useState } from 'react'
import { MarkdownEditor } from './MarkdownEditor'

type Props = {
	question: string
	setQuestion: (value: string) => void
	title: string
	handleProgress?: (e: React.FormEvent) => void
	handleBeforeProgress?: (e: React.FormEvent) => void
}

const QuestionContent: React.FunctionComponent<Props> = ({
	question,
	setQuestion,
	title,
	handleProgress,
	handleBeforeProgress
}) => {
	return (
		<div className="h-full">
			<div className="text-xl mb-2 ml-2">
				<span>{title}</span>
				{handleBeforeProgress && (
					<button
						className="btn btn-primary m-2"
						onClick={handleBeforeProgress}
					>
						이전
					</button>
				)}
				{handleProgress && (
					<button className="btn btn-primary m-2" onClick={handleProgress}>
						{question === '' ? '건너뛰기' : '다음'}
					</button>
				)}
			</div>
			<MarkdownEditor
				height={450}
				className="input input-bordered w-full m-2 h-full"
				value={question}
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				onChange={(value) => setQuestion(value!)}
			/>
		</div>
	)
}

export default QuestionContent
