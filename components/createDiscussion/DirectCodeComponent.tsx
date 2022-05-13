import React, { useState } from 'react'
import { DirectCode } from '../../api/Discussion'
import { MonacoEditor } from './MonacoEditor'

type Props = {
	codes: DirectCode[]
	setCodes: (value: DirectCode[]) => void
}

const languageGroup = [
	'JavaScript',
	'TypeScript',
	'Java',
	'Python',
	'C',
	'C#',
	'C++',
	'HTML',
	'XML',
	'PHP',
	'JSON',
	'Markdown',
	'Powershell',
	'Ruby',
	'CSS',
	'SCSS',
	'SASS',
	'R'
]

const DirectCodeComponent: React.FunctionComponent<Props> = ({
	codes,
	setCodes
}) => {
	const [language, setLanguage] = useState<string[]>([])
	const handleAddFile = () => {
		setCodes([
			...codes,
			{ filename: '', content: '// write codes', language: 'JavaScript' }
		])
	}
	const handleDeleteFile = (index: number) => {
		const newCodes = [...codes]
		newCodes.splice(index, 1)
		setCodes(newCodes)
		const newLanguage = [...language]
		newLanguage.splice(index, 1)
		setLanguage(newLanguage)
	}
	const handleChangeName = (value: string | undefined, idx: number) => {
		const newCodes = [...codes]
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		newCodes[idx].filename = value!
		setCodes(newCodes)
	}
	const handleChangeCode = (value: string | undefined, idx: number) => {
		const newCodes = [...codes]
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		newCodes[idx].content = value!
		setCodes(newCodes)
	}
	const handleLanguage = (value: string | undefined, idx: number) => {
		const newCodes = [...codes]
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		newCodes[idx].language = value!
		setCodes(newCodes)
	}
	return (
		<div className="create_discussion_form">
			<div>
				<div className="btn btn-warning" onClick={handleAddFile}>
					Add Code
				</div>
			</div>
			<div>
				{codes.map((code, idx) => {
					return (
						<div key={idx} className="flex flex-col">
							<div className="flex flex-row items-center">
								<input
									type="text"
									placeholder="File명을 입력하세요"
									className="input input-bordered w-full max-w-[10rem] mt-2 mb-2"
									value={code.filename}
									onChange={(e) => handleChangeName(e.target.value, idx)}
								/>
								<select
									className="select select-bordered ml-2"
									value={code.language}
									onChange={(e) => handleLanguage(e.target.value, idx)}
								>
									{languageGroup.map((lang) => {
										return (
											<option key={lang} value={lang}>
												{lang}
											</option>
										)
									})}
								</select>
								<div
									className="btn btn-error ml-2"
									onClick={() => handleDeleteFile(idx)}
								>
									X
								</div>
							</div>
							<div>
								<div className="border-solid border-2">
									<MonacoEditor
										code={code}
										handleChangeCode={handleChangeCode}
										idx={idx}
										language={code.language}
									/>
								</div>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default DirectCodeComponent
