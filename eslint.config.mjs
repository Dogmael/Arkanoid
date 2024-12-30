import neostandard from 'neostandard'

export default [
  // Configuration personnalisée prioritaire
  ...neostandard(),
  {
    files: ['**/*.js'], // Applique cette configuration aux fichiers JS
    ignores: ['node_modules/**'], // Ignore les dossiers spécifiques
    languageOptions: {
      ecmaVersion: 'latest', // Version ECMAScript
      sourceType: 'module',  // Spécifie les modules ES6
      globals: {
        jest: 'readonly',
        test: 'readonly',
        expect: 'readonly',
      }
    },
    rules: {
      '@stylistic/indent': ['error', 'tab'],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/no-tabs': 'off',
    },
  },
  // Configuration importée de neostandard
]
