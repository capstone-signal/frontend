import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import { useEffect, useRef, useState } from 'react'
import { WebsocketProvider } from 'y-websocket'
import { getReviewByDiscussionId, ReviewResponse } from '../../api/Review'
import { getReviewReservationById } from '../../api/ReviewReservation'
import * as Y from 'yjs'
import Editor from '@monaco-editor/react'
import * as monaco from 'monaco-editor'
import { MonacoBinding } from 'y-monaco'

type Props = {
	review: ReviewResponse
}

const LiveSessionPage: NextPage<Props> = ({ review }) => {
	const [init, setInit] = useState(false)
	const monacoRef = useRef<any>(null)
	const editorRef = useRef<any>(null)
	const handleEditorDidMount = (editor: any, monaco: any) => {
		editorRef.current = editor
		monacoRef.current = monaco
		setInit(true)
	}

	// useEffect(() => {
	// 	if (!window) return
	// 	if (!init) return
	// 	if (!monacoRef.current) return
	// 	if (!editorRef.current) return

	// 	const ydoc = new Y.Doc()
	// 	const provider = new WebsocketProvider(
	// 		'ws://localhost:1235',
	// 		review.id.toString(),
	// 		ydoc
	// 	)
	// 	const ytext = ydoc.getText('text')

	// 	const editor = editorRef.current

	// 	const monacoBinding = new MonacoBinding(
	// 		ytext,
	// 		/** @type {monaco.editor.ITextModel} */ editor.getModel(),
	// 		new Set([editor]),
	// 		provider.awareness
	// 	)
	// }, [review.id, init])

	return <div>{review.id}</div>
}

export const getServerSideProps: GetServerSideProps<Props> = async (
	ctx: GetServerSidePropsContext
) => {
	const reservationId = parseInt(ctx.params?.id as string)
	if (isNaN(reservationId)) {
		throw new Error('Invalid reservation id')
	}

	// const reviewReservation = await getReviewReservationById(reservationId)
	// if (!reviewReservation) {
	// 	throw new Error('Reservation id not found')
	// }
	const reviews = await getReviewByDiscussionId(7100, 0)
	return {
		props: {
			review: reviews.content[0]
		}
	}
}
export default LiveSessionPage
