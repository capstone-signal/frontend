module.exports = {
	content: ['.{layouts,pages,components}/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {}
	},
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	plugins: [require('daisyui')],
	daisyui: {
		styled: true,
		base: true,
		utils: true,
		logs: true,
		rtl: false
	}
}
