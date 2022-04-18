import { MDEditorProps } from '@uiw/react-md-editor'
import dynamic from 'next/dynamic'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'

const MDEditor = dynamic<MDEditorProps>(() => import('@uiw/react-md-editor'), {
	ssr: false
})

export type EditorProps = MDEditorProps

export const MarkdownEditor = ({ ...rest }: MDEditorProps) => {
	return <MDEditor {...rest} />
}
