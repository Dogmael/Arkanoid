import baseConfig from '../eslint.config.mjs';

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
				// Ajout des variables globales spécifiques à l'environnement navigateur
				window: 'readonly',
				document: 'readonly',
				console: 'readonly',
				Image: 'readonly',
				Audio: 'readonly',
				addEventListener: 'readonly',
				localStorage: 'readonly',
				requestAnimationFrame: 'readonly',
				test: 'readonly',
				expect: 'readonly',
			},
		}
	},
];
