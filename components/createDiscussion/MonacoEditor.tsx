import React from 'react'
import dynamic from 'next/dynamic'
import { DirectCode } from '../../api/Discussion'

const Editor = dynamic(() => import('@monaco-editor/react'), {
	ssr: false
})

type Props = {
	code: DirectCode
	handleChangeCode: (value: string, idx: number) => void
	idx: number
	language: string
}

export const MonacoEditor: React.FunctionComponent<Props> = ({
	code,
	handleChangeCode,
	idx,
	language
}) => {
	return (
		<Editor
			height="20rem"
			defaultLanguage="javascript"
			language={language}
			value={code.content}
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			onChange={(value) => handleChangeCode(value!, idx)}
		/>
	)
}
