import React, { useState } from 'react'
import { MarkdownEditor } from './MarkdownEditor'
import { DirectCode } from '../../api/Discussion'

type Props = {
	codes: DirectCode[]
	setCodes: (value: DirectCode[]) => void
}

const DirectCodeComponent: React.FunctionComponent<Props> = ({
	codes,
	setCodes
}) => {
	const handleAddFile = () => {
		setCodes([...codes, { filename: '', content: '' }])
	}
	const handleDeleteFile = (index: number) => {
		const newCodes = [...codes]
		newCodes.splice(index, 1)
		setCodes(newCodes)
	}
	const handleChangeCode = (value: string | undefined, idx: number) => {
		const newCodes = [...codes]
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		newCodes[idx].content = value!
		setCodes(newCodes)
	}
	return (
		<div className="create_discussion_form">
			<div>
				<div className="btn btn-warning" onClick={handleAddFile}>
					Add Code
				</div>
			</div>
			{codes.map((code, idx) => {
				return (
					<div key={idx} className="flex flex-row">
						<MarkdownEditor
							value={code.content}
							onChange={(value) => handleChangeCode(value, idx)}
						/>
						<div
							className="btn btn-error"
							onClick={() => handleDeleteFile(idx)}
						>
							X
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default DirectCodeComponent
