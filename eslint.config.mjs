import neostandard from 'neostandard';

export default [
	// Configuration importée de neostandard avec TypeScript activé
	...neostandard({ ts: true }),
	// Configuration personnalisée prioritaire pour JavaScript et TypeScript
	{
		files: ['**/*.js', '**/*.mjs', '**/*.ts'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
		},
		rules: {
			'@stylistic/indent': ['error', 'tab'],
			'@stylistic/semi': ['error', 'always'],
			'@stylistic/no-tabs': 'off',
		}
	},
	{
		ignores: ['bakcend/dist/**', 'backend/node_modules/**', 'frontend/dist/**', 'frontend/node_modules/**'],
	}
];
