/** @type {import('eslint').Linter.Config} */
const config = {
	root: true,
	extends: [
		'@sveltejs/eslint-config',
		'prettier'
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	ignorePatterns: ['dist/', '.svelte-kit/'],
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser'
			}
		}
	]
};

export default config; 