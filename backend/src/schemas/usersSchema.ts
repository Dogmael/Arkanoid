export const updateBestScoreSchema = {
	params: {
		type: 'object',
		properties: {
			email: { type: 'string' }, // typeScript email type ?
			bestScore: { type: 'number' },
		},
		required: ['email', 'bestScore'],
	}
};

export const addUserSchema = {
	params: {
		type: 'object',
		properties: {
			email: { type: 'string' },
			name: { type: 'string' },
			bestScore: { type: 'number' }, // Pertinent pour une création d'utilisateur ?
		}
	},
	required: ['email', 'name'],
};
