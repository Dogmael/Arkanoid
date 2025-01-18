import backendConfig from './backend/jest.config.js';
import frontendConfig from './frontend/jest.config.js';

export default {
	projects: [
		{
			...frontendConfig,
			displayName: 'frontend',
			rootDir: './frontend',
			testMatch: ['**/*.test.js']
		},
		{
			...backendConfig,
			displayName: 'backend',
			rootDir: './backend',
			testMatch: ['**/*.test.ts']
		}
	]
};
