/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { MarkdownPreviewProps } from '@uiw/react-markdown-preview'
import { useSelectionLocation } from '../../hooks/useSelectionLocation'
import AddCommentReviewModal from './AddCommentReviewModal'
import { CommentReviewDiff } from '../../api/Review'
import { DiscussionCodeResponse } from '../../api/Discussion'
import { getNodeOffset } from '../../utils/getNodeOffset'

const MarkdownViewer = dynamic<MarkdownPreviewProps>(
	() => import('@uiw/react-markdown-preview'),
	{
		ssr: false
	}
)

interface Props {
	reviewee: number
	discussionCode: DiscussionCodeResponse
	newReviewList: CommentReviewDiff[]
	setNewReviewList: (value: CommentReviewDiff[]) => void
}

const codeMarkdownViewerStyle: React.CSSProperties & Record<string, any> = {
	padding: '2rem',
	backgroundColor: '#000',
	height: '32rem',
	overflow: 'scroll',
	scrollbarWidth: 'none',
	msOverflowStyle: 'none',
	'&::WebkitScrollbar': {
		display: 'none'
	}
}

function ClickEndHandler(e: any) {
	const { x, y } = useSelectionLocation(e, 'code-block')
	const addEl = document.getElementById('add-review')
	addEl!.style.left = x + 'px'
	addEl!.style.top = y + 'px'
	addEl!.style.display = 'flex'
	addEl!.style.position = 'absolute'
}

function ButtonClear() {
	window.getSelection()?.empty()
	const addEl = document.getElementById('add-review')
	addEl!.style.display = 'none'
}

const DiscussionCode: React.FC<Props> = ({
	reviewee,
	discussionCode,
	newReviewList,
	setNewReviewList
}) => {
	const [reviewCode, setReviewCode] = useState<string>('')
	const [newCode, setNewCode] = useState<string>('')
	const [offset, setOffset] = useState<number[]>([0, 0])
	const selection = window.getSelection()
	const dragCode = (e: any) => {
		// offset 찾아내기
		if (selection === null) return
		const { anchorNode, focusNode, anchorOffset, focusOffset } = selection
		const { NodeOffset: startOffset } = getNodeOffset(anchorNode!, anchorOffset)
		const { NodeOffset: EndOffset } = getNodeOffset(focusNode!, focusOffset)

		if (anchorOffset != focusOffset) {
			const clientRects = selection?.getRangeAt(0).getBoundingClientRect()
			ClickEndHandler(clientRects)
			const selectedCodes = selection?.toString()
			setReviewCode(selectedCodes!)
			setOffset([startOffset, EndOffset])
		}
	}
	const handleReviewAdd = (newCode: string, comment: string) => {
		const codeAfter =
			discussionCode.content.substring(0, Math.min(offset[0], offset[1])) +
			newCode +
			discussionCode.content.substring(
				Math.max(offset[0], offset[1]),
				discussionCode.content.length
			)
		const newReview = {
			codeAfter: codeAfter,
			codeLocate: offset,
			comment: comment,
			discussionCode: discussionCode
		}
		setNewReviewList([...newReviewList, newReview])
	}
	return (
		<>
			<div id="code-block" onMouseUp={dragCode} onMouseDown={ButtonClear}>
				<MarkdownViewer
					source={`\`\`\`${discussionCode.language}\n${discussionCode.content}\n\`\`\``}
					style={codeMarkdownViewerStyle}
				/>
			</div>
			<label
				htmlFor="addCommentReview"
				id="add-review"
				onClick={() => {
					ButtonClear()
					setNewCode(reviewCode)
				}}
				className="btn modal-button hidden"
			>
				Add
			</label>
			<input type="checkbox" id="addCommentReview" className="modal-toggle" />
			<div className="modal">
				<AddCommentReviewModal
					reviewee={reviewee}
					newCode={newCode}
					language={discussionCode.language}
					setNewCode={setNewCode}
					handleReviewAdd={handleReviewAdd}
				/>
			</div>
		</>
	)
}

export default DiscussionCode
