import { useState } from 'react'
import dynamic from 'next/dynamic'
import { MarkdownPreviewProps } from '@uiw/react-markdown-preview'

const MarkdownViewer = dynamic<MarkdownPreviewProps>(
	() => import('@uiw/react-markdown-preview'),
	{
		ssr: false
	}
)

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {
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

const TextDragTest: React.FC<Props> = ({ content }) => {
	const [reviewCode, setReviewCode] = useState('')
	const selection = window.getSelection()
	const dragCode = () => {
		if (
			selection?.anchorNode == selection?.focusNode &&
			selection?.anchorOffset == selection?.focusOffset
		)
			return
		console.log(selection?.anchorNode, selection?.anchorOffset)
		console.log(selection?.focusNode, selection?.focusOffset)
	}
	return (
		<div onMouseUp={dragCode}>
			<MarkdownViewer
				source={`\`\`\`\n ${content} \n\`\`\``} /* TODO : language 추가*/
				style={codeMarkdownViewerStyle}
			/>
		</div>
	)
}

export default TextDragTest
