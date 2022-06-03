import Link from 'next/link'
import { useRouter } from 'next/router'

interface Props {
	discussionAmount: number | undefined
	urlFrom: string
	onlyMine: string
}

const Pagination: React.FunctionComponent<Props> = ({
	discussionAmount,
	urlFrom,
	onlyMine
}) => {
	const router = useRouter()
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const maxPageNumber = Math.ceil(discussionAmount! / 5)
	const { tags, state, keyword, sort } = router.query
	const currentPage = router.query.page
		? parseInt(router.query.page as string)
		: 1
	const pageArray = [
		currentPage - 2,
		currentPage - 1,
		currentPage,
		currentPage + 1,
		currentPage + 2
	]
	const URLexceptPage = `${state ? `&state=${state}` : ''}
		${tags ? `&tags=${tags}` : ''}
		${keyword ? `&keyword=${keyword}` : ''}
		${sort ? `&sort=${sort}` : ''}
		${onlyMine != '' ? `&onlyMine=${onlyMine}` : ''}`
	return (
		<div className="flex justify-center">
			<div>
				<Link href={`/${urlFrom}?page=1${URLexceptPage}`} passHref>
					<div className={`btn btn-sm m-1 btn-outline`}>&laquo;</div>
				</Link>
				{pageArray.map((pageNumber) => (
					<Link
						key={pageNumber}
						href={`/${urlFrom}?page=${pageNumber}${URLexceptPage}`}
						passHref
					>
						<div
							className={`btn btn-sm m-1 ${
								pageNumber < 1 || pageNumber > maxPageNumber ? `invisible` : ``
							} ${pageNumber == currentPage ? `btn-active` : `btn-outline`}`}
						>
							{pageNumber}
						</div>
					</Link>
				))}
				<Link
					href={`/${urlFrom}?page=${maxPageNumber}${URLexceptPage}`}
					passHref
				>
					<div className={`btn btn-sm m-1 btn-outline`}>&raquo;</div>
				</Link>
			</div>
		</div>
	)
}

export default Pagination
