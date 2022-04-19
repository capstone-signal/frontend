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
	return (
		<div className="create_discussion_form">
			<div>
				<div className="btn btn-error ml-2" onClick={handleAddFile}>
					Add Code
				</div>
			</div>
			{codes.map((code, idx) => {
				return (
					<div key={idx}>
						<MarkdownEditor
							value={code.content}
							onChange={(value) => {
								const newCodes = [...codes]
								// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
								newCodes[idx].content = value!
								setCodes(newCodes)
							}}
						/>
					</div>
				)
			})}
			<br />
		</div>
	)
}

export default DirectCodeComponent
