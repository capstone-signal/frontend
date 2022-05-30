/* eslint-disable prettier/prettier */
import { DiffEditor } from '@monaco-editor/react'
import { useEffect, useRef, useState } from 'react'
import { DiscussionCodeResponse } from '../../api/Discussion'
import { ReviewResponse } from '../../api/Review'
import ThreadList from './ThreadList'

type Props = {
	review: ReviewResponse
	discussionCodes: DiscussionCodeResponse[]
}

const ReviewDetail: React.FC<Props> = ({ review, discussionCodes }) => {
	const [isInit, setInit] = useState<boolean>(false)
	const [selectedDiscussionCode, setSelectedDiscussionCode] =
		useState<number>(0)
	const diffEditorRef = useRef<any>(null)
	const monacoRef = useRef<any>(null)
	const handleEditorDidMount = (editor: any, monaco: any) => {
		diffEditorRef.current = editor
		monacoRef.current = monaco
		setInit(true)
	}

	const handleClickDiscussionCode = (idx: number) => {
		setSelectedDiscussionCode(idx)
	}

	useEffect(() => {
		if (!isInit) return
		if (!monacoRef.current) return
		if (!review.commentDiffList) return
		const editor = diffEditorRef.current
		const monaco = monacoRef.current
		const selectedReview = isCommentReview(review)
			? review.commentDiffList[selectedDiscussionCode]
			: review.liveDiffList[selectedDiscussionCode]
		const matchedDiscussionCode = discussionCodes.find((code) => code.id === selectedReview.discussionCode)
		if (!matchedDiscussionCode) return

		// TODO : Refactor -> 타입 체크
		const originalCode = matchedDiscussionCode.content
		const originalModel = monaco.editor.createModel(originalCode)
		let modifiedCode = ''
		if(isCommentReview(review)) {
			const codeLocate = review.commentDiffList[selectedDiscussionCode].codeLocate
			modifiedCode = originalCode.substring(0, codeLocate[0]) + selectedReview.codeAfter + originalCode.substring(codeLocate[1])
		} else {
			modifiedCode = selectedReview.codeAfter
		}
		const modifiedModel = monaco.editor.createModel(modifiedCode)
		editor.setModel({
			original: originalModel,
			modified: modifiedModel
		})
	}, [review, review.commentDiffList, selectedDiscussionCode, isInit, discussionCodes])

	return (
		<div className="flex-col min-h-[36rem] border-b-2 border-gray-600">
			<div className="review_header">
				<div className="avatar placeholder flex items-center my-4">
					<div className="bg-neutral-focus ring text-neutral-content rounded-full w-8">
						<span className="text-2xl">{review.reviewer.name[0]}</span>
					</div>
					<span className="text ml-3">{review.reviewer.name}</span>
					{review.accepted && (
						<span className="badge badge-lg badge-success ml-4">채택</span>
					)}
				</div>
			</div>
			<div className="review_code_list flex flex-row">
				<div className="discussion_code_list basis-1/6">
					<div className="p-4 border-2 rounded-tl-2xl border-gray-600">
						목록
					</div>
					<div className="discussion_codes">
						{[...review.commentDiffList, ...review.liveDiffList].map(
							(commentDiff, idx) => {
								return (
									<div
										key={idx}
										className={`pl-4 py-4 cursor-pointer ${
											idx === selectedDiscussionCode
												? 'bg-primary-focus'
												: 'hover:bg-neutral'
										}`}
										onClick={() => handleClickDiscussionCode(idx)}
									>
										{discussionCodes.find((code) => code.id === commentDiff.discussionCode)?.filename}
									</div>
								)
							}
						)}
					</div>
				</div>
				<div className="review_code_diff basis-3/6">
					<div className="p-4 border-2 border-gray-600">코드</div>
					<div className="code_editor">
						<DiffEditor
							height={'30rem'}
							theme="vs-dark"
							options={{
								enableSplitViewResizing: false,
								renderSideBySide: false,
								readOnly: true
							}}
							onMount={handleEditorDidMount}
						/>
					</div>
				</div>
				<div className="review_code_comment basis-2/6">
					<div className="p-4 border-2 rounded-tr-2xl border-gray-600">
						코멘트
					</div>
					<div className="code_comment p-4">
						{isCommentReview(review) &&
							review.commentDiffList[selectedDiscussionCode].comment}
					</div>
				</div>
			</div>
			<div className="review_thread mt-4">
				<ThreadList review={review} />
			</div>
		</div>
	)
}

export default ReviewDetail

function isCommentReview(review: ReviewResponse) {
	return review.reviewType === 'COMMENT'
}
