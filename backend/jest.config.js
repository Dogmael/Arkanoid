export default {
	preset: 'ts-jest',
	testEnvironment: 'node',
	testMatch: ['**/*.test.ts'],
	globalSetup: './test-global-setup.js'
};
