import baseConfig from '../eslint.config.mjs';
import globals from 'globals';

export default [
	// Configuration de base héritée de baseConfig
	...baseConfig,
	// Configuration additionnelle pour les fichiers locaux
	{
		files: ['**/*.js'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: {
				...globals.browser,
				...globals.mocha,
				...globals.jest,
			},
		}
	},
];
