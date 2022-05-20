/* eslint-disable @typescript-eslint/no-non-null-assertion */
export function getNodeOffset(
	anchorNode: Node,
	anchorOffset: number
): {
	NodeOffset: number
} {
	let nowCodeLine = anchorNode?.parentElement
	while (!nowCodeLine?.className.includes('code-line') && nowCodeLine)
		nowCodeLine = nowCodeLine?.parentElement
	const codeAll = nowCodeLine?.parentElement

	if (codeAll?.children == undefined) return { NodeOffset: 0 }
	const codeLineArray = Array.from(codeAll?.children)

	let i = 0
	let lengthSum = 0
	while (codeLineArray[i] != nowCodeLine) {
		lengthSum += codeLineArray[i].textContent!.length
		i++
	}

	const nowCodeLineArray = Array.from(nowCodeLine.childNodes)
	const { offset: nowCodeLineOffset } = codeLineSplit(
		nowCodeLineArray,
		anchorNode
	)
	const NodeOffset = lengthSum + nowCodeLineOffset
	return { NodeOffset: NodeOffset + anchorOffset }
}

function codeLineSplit(
	nowCodeLineArray: ChildNode[],
	anchorNode: Node
): { offset: number; figureOut: boolean } {
	let offset = 0
	let figureOut = false
	for (let i = 0; i < nowCodeLineArray.length; i++) {
		if (nowCodeLineArray[i]) {
			if (nowCodeLineArray[i].hasChildNodes()) {
				const { offset: childOffset, figureOut: childFigureOut } =
					codeLineSplit(Array.from(nowCodeLineArray[i].childNodes), anchorNode)
				offset += childOffset
				if (childFigureOut) {
					figureOut = true
					break
				}
			} else {
				if (nowCodeLineArray[i] == anchorNode) {
					figureOut = true
					break
				}
				offset += nowCodeLineArray[i].textContent!.length
			}
		}
	}
	return { offset, figureOut }
}
