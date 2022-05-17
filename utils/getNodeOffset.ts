/* eslint-disable @typescript-eslint/no-non-null-assertion */
export function getNodeOffset(
	anchorNode: Node,
	focusNode: Node,
	anchorOffset: number,
	focusOffset: number
): {
	startOffset: number
	endOffset: number
} {
	let nowCodeLine = anchorNode?.parentElement
	if (!nowCodeLine?.className.includes('code-line') && nowCodeLine)
		nowCodeLine = nowCodeLine?.parentElement
	const codeAll = nowCodeLine?.parentElement

	if (codeAll?.children == undefined)
		return { startOffset: anchorOffset, endOffset: focusOffset }
	const codeLineArray = Array.from(codeAll?.children)

	let i = 0
	let lengthSum = 0
	while (codeLineArray[i] != nowCodeLine) {
		console.log(
			codeLineArray[i].textContent,
			codeLineArray[i].textContent!.length
		)
		lengthSum += codeLineArray[i].textContent!.length
		i++
	}

	console.log(lengthSum)
	//console.log(discussionCode.content.slice(0, lengthSum))

	console.log(nowCodeLine)
	const nowCodeLineArray = Array.from(nowCodeLine.children)
	i = 0
	console.log(nowCodeLineArray)
	while (nowCodeLineArray[i] != anchorNode) {
		console.log(nowCodeLineArray[i])
		//console.log(
		//	nowCodeLineArray[i].textContent,
		//	nowCodeLineArray[i].textContent!.length
		//)
		//lengthSum += nowCodeLineArray[i].textContent!.length
		//i++
	}
	const startOffset = lengthSum
	const endOffset = 0
	return { startOffset, endOffset }
}
