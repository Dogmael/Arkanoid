export default {
	transform: {
		'^.+\\.js$': 'babel-jest'
	},
	testEnvironment: 'jest-environment-jsdom',
	setupFilesAfterEnv: ['jest-canvas-mock'],
	moduleNameMapper: {
		'\\.(css|less|scss|sass)$': 'identity-obj-proxy'
	}
};
