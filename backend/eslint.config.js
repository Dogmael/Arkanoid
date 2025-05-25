import baseConfig from '../eslint.config.mjs';

export default [
	...baseConfig,
	{
		files: ['**/*.js'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
		}
	},
	{
		ignores: ['dist/**', 'node_modules/**'],
	}
];
