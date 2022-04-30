import { DiffEditor } from '@monaco-editor/react'
import { useEffect, useRef, useState } from 'react'
import { useQuery } from 'react-query'
import { ReviewResponse } from '../../api/Review'

type Props = {
	review: ReviewResponse
}

const ReviewDetail: React.FC<Props> = ({ review }) => {
	const [isToggled, setToggled] = useState<boolean>(false)
	const [selectedDiscussionCode, setSelectedDiscussionCode] =
		useState<number>(0)
	const [selectedCodeBefore, setSelectedCodeBefore] = useState<any>('')
	const [selectedCodeAfter, setSelectedCodeAfter] = useState<any>('')
	const { data, error, isLoading } = useQuery(
		['reviewDetail', review.id],
		() => {
			return null
		}
	)

	const diffEditorRef = useRef<any>(null)
	const monacoRef = useRef<any>(null)
	const handleEditorDidMount = (editor: any, monaco: any) => {
		diffEditorRef.current = editor
		monacoRef.current = monaco
	}

	const handleClickDiscussionCode = (idx: number) => {
		setSelectedDiscussionCode(idx)
	}

	useEffect(() => {
		if (!monacoRef.current) return
		const editor = diffEditorRef.current
		const monaco = monacoRef.current
		const selectedReview = review.commentDiffList[selectedDiscussionCode]
		const originalModel = monaco.editor.createModel(
			'just some text\nabcz\nzzzzefgh\nSome more text\nThis line is removed on the left.' //selectedReview.discussionCode.content
		)
		const modifiedModel = monaco.editor.createModel(
			'This line is removed on the right.\njust some text\nabcd\nefgh\nSome more text'
		) //selectedReview.codeAfter)
		editor.setModel({
			original: originalModel,
			modified: modifiedModel
		})
	}, [review.commentDiffList, selectedDiscussionCode])
	// toggled , then hide the review detail
	// if not toggled, get the review thread & detail
	return (
		<div className="flex-col min-h-[36rem]">
			<div className="review_header">
				<div className="avatar placeholder flex items-center my-4">
					<div className="bg-neutral-focus ring text-neutral-content rounded-full w-8">
						<span className="text-2xl">{review.reviewer.name[0]}</span>
					</div>
					<span className="text ml-3">{review.reviewer.name}</span>
				</div>
			</div>
			<div className="review_code_list flex flex-row">
				<div className="discussion_code_list basis-1/6">
					<div className="alert alert-info shadow-lg rounded-none">목록</div>
					<div className="discussion_codes">
						{review.commentDiffList.map((commentDiff, idx) => {
							return (
								<div
									key={idx}
									className={`pl-4 py-4 cursor-pointer ${
										idx === selectedDiscussionCode ? 'bg-primary' : ''
									}`}
									onClick={() => handleClickDiscussionCode(idx)}
								>
									{commentDiff.discussionCode.filename}
								</div>
							)
						})}
					</div>
				</div>
				<div className="review_code_diff basis-3/6">
					<div className="alert alert-info shadow-lg rounded-none">코드</div>
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
					<div className="alert alert-info shadow-lg rounded-none">코멘트</div>
					<div className="code_comment p-4">
						{isCommentReview(review) &&
							review.commentDiffList[selectedDiscussionCode].comment}
					</div>
				</div>
			</div>
			<div className="review_thread"></div>
		</div>
	)
}

export default ReviewDetail

function isCommentReview(review: ReviewResponse) {
	return review.reviewType === 'COMMENT'
}
