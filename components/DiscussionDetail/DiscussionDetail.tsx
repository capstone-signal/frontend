import {
	DiscussionCodeResponse,
	DiscussionResponse
} from '../../api/Discussion'
import { MarkdownPreviewProps } from '@uiw/react-markdown-preview'
import dayjs from 'dayjs'
import '@uiw/react-markdown-preview/markdown.css'
import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Editor from '@monaco-editor/react'

type Props = {
	discussion: DiscussionResponse
	codes: DiscussionCodeResponse[]
}

const MarkdownViewer = dynamic<MarkdownPreviewProps>(
	() => import('@uiw/react-markdown-preview'),
	{
		ssr: false
	}
)

const markdownViewerStyle: React.CSSProperties = {
	padding: '2rem',
	backgroundColor: 'transparent',
	border: '1px solid #eaeaea',
	borderRadius: '6px'
}
const DiscussionDetail: React.FC<Props> = ({ discussion, codes }) => {
	const [selectedCode, setSelectedCode] = useState<number>(0)

	const handleClickCode = (index: number) => {
		setSelectedCode(index)
	}

	return (
		<div>
			<div className="dd_header">
				<h1 className="text-4xl">{discussion.title}</h1>
				<div className="flex items-center justify-between">
					<div className="avatar placeholder flex items-center my-4">
						<div className="bg-neutral-focus text-neutral-content rounded-full w-8">
							<span className="text-2xl">{discussion.user.name[0]}</span>
						</div>
						<span className="text ml-3">{discussion.user.name}</span>
					</div>
					<span className="text mr-6 created_at">
						{dayjs(discussion.createdAt).format('YYYY/MM/DD hh:mm')}
					</span>
				</div>
				<div className="tags">
					{discussion.tags?.map((tag) => (
						<div className="badge badge-info badge-lg mx-1" key={tag.id}>
							{tag.name}
						</div>
					))}
				</div>
			</div>
			<div className="dd_question">
				<MarkdownViewer
					source={discussion.question}
					style={markdownViewerStyle}
				/>
			</div>
			<div className="dd_codes flex flex-row mt-10 mx-6">
				<div className="files_nav basis-1/6">
					<div className="files_nav_header">
						<div className="alert alert-info shadow-lg rounded-none text-2xl">
							Files
						</div>
						<div>
							{codes.map((code, idx) => {
								return (
									<div
										className={`pl-4 py-4 cursor-pointer ${
											idx === selectedCode ? 'bg-primary' : ''
										}`}
										key={code.id}
										onClick={() => handleClickCode(idx)}
									>
										{code.filename}
									</div>
								)
							})}
						</div>
					</div>
				</div>
				<div className="codes basis-5/6">
					<div className="codes_header flex flex-row">
						<div className="alert alert-info shadow-lg rounded-none text-2xl basis-1/5">
							Codes
						</div>
					</div>
					<div className="selected_code">
						<Editor
							height="15rem"
							value={codes[selectedCode].content}
							theme="vs-dark"
							options={{
								readOnly: true
							}}
						/>
					</div>
				</div>
			</div>
			<div className="dd_live_review_box flex justify-center">
				<div
					className={`btn mt-6 ${
						discussion.liveReviewRequired ? 'btn-primary' : 'btn-disabled'
					}`}
				>
					라이브 리뷰 예약
				</div>
			</div>
		</div>
	)
}

export default DiscussionDetail
