export const useSelectionLocation = (e: any) => {
	const x =
		e.right +
		(document.documentElement.scrollLeft
			? document.documentElement.scrollLeft
			: document.body.scrollLeft)
	const y =
		e.y +
		(document.documentElement.scrollTop
			? document.documentElement.scrollTop
			: document.body.scrollTop)

	return { x, y }
}
