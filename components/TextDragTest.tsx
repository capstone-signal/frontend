import { useState } from 'react'
import dynamic from 'next/dynamic'
import { MarkdownPreviewProps } from '@uiw/react-markdown-preview'
import { useMouseLocation } from '../hooks/useMouseLocation'

const MarkdownViewer = dynamic<MarkdownPreviewProps>(
	() => import('@uiw/react-markdown-preview'),
	{
		ssr: false
	}
)

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {
	language: string
	content: string
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

function ClickEndHandler(e: MouseEvent) {
	const { x, y } = useMouseLocation(e)
	const addEl = document.getElementById('add-review')
	addEl!.style.left = x + 'px'
	addEl!.style.top = y + 10 + 'px'
	addEl!.style.display = 'block'
	addEl!.style.position = 'absolute'
}

const TextDragTest: React.FC<Props> = ({ language, content }) => {
	const [reviewCode, setReviewCode] = useState('')
	const selection = window.getSelection()
	console.log(selection)
	const dragCode = (e: any) => {
		if (
			selection?.anchorNode == selection?.focusNode &&
			selection?.anchorOffset == selection?.focusOffset
		)
			return
		ClickEndHandler(e)
		console.log(selection?.anchorNode, selection?.anchorOffset)
		console.log(selection?.focusNode, selection?.focusOffset)
	}
	return (
		<div onMouseUp={dragCode}>
			<MarkdownViewer
				source={`\`\`\`${language}\n ${content} \n\`\`\``}
				style={codeMarkdownViewerStyle}
			/>
			<button id="add-review" className="btn hidden">
				+
			</button>
		</div>
	)
}

export default TextDragTest
