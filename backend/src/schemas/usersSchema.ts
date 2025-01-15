export const updateBestScoreSchema = {
	params: {
		type: 'object',
		properties: {
			userName: { type: 'string' }, // typeScript userName type ?
			bestScore: { type: 'number' },
		},
		required: ['userName', 'bestScore'],
	}
};

export const addUserSchema = {
	params: {
		type: 'object',
		properties: {
			userName: { type: 'string' },
			pseudo: { type: 'string' },
			bestScore: { type: 'number' }, // Pertinent pour une création d'utilisateur ?
		}
	},
	required: ['userName', 'pseudo'],
};
