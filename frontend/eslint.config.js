import globals from 'globals';
import baseConfig from '../eslint.config.mjs';

export default [
	// Configuration de base héritée
	...baseConfig,
	{
		files: ['**/*.js'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: {
				...globals.browser,
				...globals.node,
				...globals.jest,
			},
		}
	},
	{
		ignores: ['dist/**', 'node_modules/**'],
	}
];
