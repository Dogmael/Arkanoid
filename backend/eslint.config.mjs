import baseConfig from '../eslint.config.mjs';

export default [
	...baseConfig,
	{
		files: ['**/*.js', '**/*.mjs',],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
		}
	},
	{
		ignores: ['dist/**', 'node_modules/**'],
	}
];
