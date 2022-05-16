import { SuccessIcon, WarningIcon } from '../Common/Icon'

type Props = {
	guideLines: {
		[key: string]: string[]
	}
	isSatisfieds: {
		[key: string]: boolean[]
	}
}

const GuideLineChecker: React.FC<Props> = ({ guideLines, isSatisfieds }) => {
	return (
		<div className="flex flex-col mt-10">
			{Object.keys(guideLines).map((key, index) => (
				<div key={index}>
					{guideLines[key].map((guideLine, gidx) => (
						<div key={index} className="flex mb-4">
							{isSatisfieds[key][gidx] ? <SuccessIcon /> : <WarningIcon />}
							<div
								className={`text ml-4 ${
									isSatisfieds[key][gidx] ? 'text-success' : 'text-error'
								}`}
							>
								{guideLine}
							</div>
						</div>
					))}
				</div>
			))}
		</div>
	)
}

export default GuideLineChecker
