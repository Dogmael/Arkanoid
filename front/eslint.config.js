import baseConfig from '../eslint.config.mjs';
import babelParser from '@babel/eslint-parser';

export default [
	// Configuration de base héritée de baseConfig
	...baseConfig,
	// Configuration additionnelle pour les fichiers locaux
	{
		files: ['**/*.js'], // Applique cette configuration uniquement aux fichiers JS
		ignores: ['node_modules/**'], // Ignore le dossier node_modules
		languageOptions: {
			ecmaVersion: 'latest', // Version ECMAScript
			sourceType: 'module',  // Type de source
			parser: babelParser, // Utilisation du parser Babel
			parserOptions: {
				requireConfigFile: false, // Pas besoin de fichier Babel séparé
			},
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
			},
		}
	},
];
