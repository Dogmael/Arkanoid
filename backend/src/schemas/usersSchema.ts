export const updateBestScoreSchema = {
	params: {
		type: 'object',
		properties: {
			userName: { type: 'string' },
			bestScore: { type: 'number' },
		},
		required: ['userName', 'bestScore'],
	}
};

export const addUserSchema = {
	body: {
		type: 'object',
		properties: {
			userName: { type: 'string' },
			email: { type: 'string' },
			bestScore: { type: 'number' },
		},
		required: ['userName', 'email']
	}
};
