/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { MarkdownPreviewProps } from '@uiw/react-markdown-preview'
import { useSelectionLocation } from '../../hooks/useSelectionLocation'
import AddCommentReviewModal from './AddCommentReviewModal'
import { CommentReviewDiff } from '../../api/Review'

const MarkdownViewer = dynamic<MarkdownPreviewProps>(
	() => import('@uiw/react-markdown-preview'),
	{
		ssr: false
	}
)

interface Props {
	language: string
	content: string
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
	const { x, y } = useSelectionLocation(e)
	const addEl = document.getElementById('add-review')
	addEl!.style.left = x + 'px'
	addEl!.style.top = y + 10 + 'px'
	addEl!.style.display = 'block'
	addEl!.style.position = 'absolute'
}

function ButtonClear() {
	window.getSelection()?.empty()
	const addEl = document.getElementById('add-review')
	addEl!.style.display = 'none'
}

const DiscussionCode: React.FC<Props> = ({
	language,
	content,
	setNewReviewList
}) => {
	const [reviewCode, setReviewCode] = useState<string>('')
	const [newCode, setNewCode] = useState<string>('')
	const selection = window.getSelection()
	const dragCode = () => {
		if (
			selection?.anchorNode == selection?.focusNode &&
			selection?.anchorOffset != selection?.focusOffset
		) {
			const clientRects = selection?.getRangeAt(0).getBoundingClientRect()
			ClickEndHandler(clientRects)
			const selectedCodes = selection?.toString()
			setReviewCode(selectedCodes!)
			//console.log(reviewCode)
			//console.log(selection?.anchorNode, selection?.anchorOffset)
			//console.log(selection?.focusNode, selection?.focusOffset)
		}
	}
	return (
		<>
			<div onMouseUp={dragCode} onMouseDown={ButtonClear}>
				<MarkdownViewer
					source={`\`\`\`${language}\n ${content} \n\`\`\``}
					style={codeMarkdownViewerStyle}
				/>
			</div>
			<a href="#addCommentReview" id="add-review" className="hidden">
				<button
					onClick={() => {
						ButtonClear()
						setNewCode(reviewCode)
					}}
					className="btn"
				>
					+
				</button>
			</a>
			<div className="modal" id="addCommentReview">
				<AddCommentReviewModal newCode={newCode} setNewCode={setNewCode} />
			</div>
		</>
	)
}

export default DiscussionCode
