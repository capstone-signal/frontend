export const useMouseLocation = (e: MouseEvent) => {
	const x =
		e.clientX +
		(document.documentElement.scrollLeft
			? document.documentElement.scrollLeft
			: document.body.scrollLeft)
	const y =
		e.clientY +
		(document.documentElement.scrollTop
			? document.documentElement.scrollTop
			: document.body.scrollTop)

	return { x, y }
}
