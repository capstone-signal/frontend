import React, { useState } from 'react'
import {
	createDiscussion,
	DirectCode,
	LiveReviewAvailableTime
} from '../api/Discussion'

type Props = Record<string, any>

const CreateDiscussionForm: React.FunctionComponent<Props> = () => {
	const [discussionType, setDiscussionType] = useState<
		'DIRECT' | 'COMMIT' | 'PR'
	>('DIRECT')
	const [question, setQuestion] = useState<string>('')
	const [selectedTagIds, setSelectedTagIds] = useState<number[]>([])
	const [liveReviewRequired, setLiveReviewRequired] = useState<boolean>(false)
	const [liveReviewAvailableTimes, setLiveReviewAvailableTimes] = useState<
		LiveReviewAvailableTime[]
	>([])
	const [codes, setCodes] = useState<DirectCode[]>([])

	const onCreateBtnClick = async (e: React.FormEvent) => {
		e.preventDefault()
		if (discussionType === 'DIRECT') {
			if (!validateCodes()) {
				alert('enter the code.')
				return
			}
		} else {
			// validate git info
		}

		// create discussion
		try {
			const discussion = await createDiscussion({
				discussionType,
				question,
				tagIds: selectedTagIds,
				liveReviewRequired,
				liveReviewAvailableTimes: {
					times: liveReviewAvailableTimes
				},
				codes,
				usePriority: false
			})
		} catch (e) {
			console.error(e)
			alert("can't create discussion.")
		}

		// reset
		reset()
	}

	const validateCodes = () => {
		throw new Error('not implemented')
	}

	const reset = () => {
		throw new Error('not implemented')
	}

	const handleChangeDiscussionType = (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		setDiscussionType(e.target.value as 'DIRECT' | 'COMMIT' | 'PR')
		if (e.target.value !== 'DIRECT') {
			setCodes([])
		}
	}

	const handleAddFile = () => {
		setCodes([...codes, { filename: '', content: '' }])
	}
	return (
		<div className="create_discussion_form">
			<form onSubmit={onCreateBtnClick}>
				<textarea
					className="textarea textarea-primary"
					placeholder="Enter questions."
					onChange={(e) => setQuestion(e.target.value)}
				>
					{question}
				</textarea>

				<select
					className="select select-primary w-full max-w-xs"
					onChange={handleChangeDiscussionType}
				>
					<option value="PR">PR</option>
					<option value="DIRECT">DIRECT</option>
					<option value="COMMIT">COMMIT</option>
				</select>
				{discussionType === 'DIRECT' && (
					<>
						<div className="btn btn-error" onClick={handleAddFile}>
							Add Code
						</div>
					</>
				)}
				{codes.map((code, idx) => {
					return (
						<div key={idx}>
							<input
								type="text"
								className="input input-bordered input-primary w-full max-w-xs"
								onChange={(e) => {
									const newCodes = [...codes]
									newCodes[idx].filename = e.target.value
									setCodes(newCodes)
								}}
								value={code.filename}
							/>
							<textarea
								className="textarea textarea-primary"
								value={code.content}
								onChange={(e) => {
									const newCodes = [...codes]
									newCodes[idx].content = e.target.value
									setCodes(newCodes)
								}}
							/>
						</div>
					)
				})}
				<button type="submit" className="btn btn-secondary">
					생성
				</button>
			</form>
		</div>
	)
}

export default CreateDiscussionForm
