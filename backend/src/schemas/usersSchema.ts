export const updateBestScoreSchema = {
    params: {
      type: 'object',
      properties: {
        email: { type: 'string' }, // typeScript email type ?
        bestScore: { type: 'number' },
      },
      required: ['email', 'bestScore'],
    },
  };