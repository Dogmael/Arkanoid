export default {
	transform: {
		'^.+\\.js$': 'babel-jest'
	},
	// extensionsToTreatAsEsm: ['.js'],
	testEnvironment: 'jest-environment-jsdom',
	setupFilesAfterEnv: ['jest-canvas-mock']
};
