/* eslint-disable prettier */

module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true
	},
	extends: [
		'eslint:recommended',
		'next',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest'
	},
	plugins: ['@typescript-eslint', 'prettier'],
	rules: {
		indent: ['error', 'tab'],
		'prettier/prettier': ['error', { endOfLine: 'auto' }]
	}
}
