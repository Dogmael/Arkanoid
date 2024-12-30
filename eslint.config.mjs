import neostandard from 'neostandard'

export default [
  // Configuration importée de neostandard
  ...neostandard(),
  // Configuration personnalisée prioritaire
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      '@stylistic/indent': ['error', 'tab'],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/no-tabs': 'off',
    },
  },
]
