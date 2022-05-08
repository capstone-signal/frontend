import React, { useState } from 'react'
import { createThread } from '../../api/Review'

type Props = {
	reviewId: number
}

const ThreadWriteForm: React.FC<Props> = ({ reviewId }) => {
	const [isLoading, setLoading] = useState<boolean>(false)

	const [threadContent, setThreadContent] = useState<string>('')
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (isLoading) return
		setLoading(true)

		try {
			await createThread(reviewId, threadContent)
			setThreadContent('')
			alert('create thread success.')
		} catch (e) {
			console.error(e)
			alert('failed to write thread.')
		}
	}
	return (
		<div className="thread_write_form w-full">
			<form onSubmit={handleSubmit} className="flex flex-row ml-6">
				<input
					type="text"
					className="input input-bordered w-full max-w-m"
					value={threadContent}
					placeholder="Write thread"
					onChange={(e) => setThreadContent(e.target.value)}
				/>
				<button className="btn btn-primary ml-6">reply</button>
			</form>
		</div>
	)
}

export default ThreadWriteForm
