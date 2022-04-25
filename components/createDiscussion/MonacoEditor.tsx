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
}

export const MonacoEditor: React.FunctionComponent<Props> = ({
	code,
	handleChangeCode,
	idx
}) => {
	return (
		<Editor
			height="15rem"
			defaultLanguage="javascript"
			value={code.content}
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			onChange={(value) => handleChangeCode(value!, idx)}
		/>
	)
}
