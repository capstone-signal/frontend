import Link from 'next/link'
import { useRouter } from 'next/router'

interface Props {
	discussionAmount: number | undefined
}

const Pagination: React.FunctionComponent<Props> = ({ discussionAmount }) => {
	const router = useRouter()
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const maxPageNumber = Math.ceil(discussionAmount! / 5)
	const { page, tags, state, keyword, sort, onlyMine } = router.query
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const currentPage = parseInt(page! as string)
	const pageArray = [
		currentPage - 2,
		currentPage - 1,
		currentPage,
		currentPage + 1,
		currentPage + 2
	]
	return (
		<div className="flex justify-center">
			<div>
				{pageArray.map((pageNumber) => (
					<Link
						key={pageNumber}
						href={`/list?page=${pageNumber}&state=${state}&tags=${tags}&keyword=${keyword}&onlyMine=false`}
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
			</div>
		</div>
	)
}

export default Pagination
