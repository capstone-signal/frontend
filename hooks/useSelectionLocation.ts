/* eslint-disable @typescript-eslint/no-non-null-assertion */
export const useSelectionLocation = (e: any, compareClass: string) => {
	const compareX =
		(document.documentElement.scrollLeft
			? document.documentElement.scrollLeft
			: document.body.scrollLeft) +
		document.getElementById(compareClass)!.getBoundingClientRect().left
	const compareY =
		(document.documentElement.scrollTop
			? document.documentElement.scrollTop
			: document.body.scrollTop) +
		document.getElementById(compareClass)!.getBoundingClientRect().bottom
	const x = Math.max(
		e.left +
			(document.documentElement.scrollLeft
				? document.documentElement.scrollLeft
				: document.body.scrollLeft),
		compareX
	)
	const y = Math.min(
		e.bottom +
			(document.documentElement.scrollTop
				? document.documentElement.scrollTop
				: document.body.scrollTop),
		compareY
	)
	return { x, y }
}
