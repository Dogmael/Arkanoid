import fastify from 'fastify';

fastify.route({
	method: 'GET',
	url: '/leaderboard',
	schema: {
		querystring: null,
		response: {
			200: {
				type: 'object',
				properties: {
					userName: { type: 'string' },
					score: { type: 'number' }
				}
			}
		}
	},
	handler: function (request, reply) {
		reply.send({ hello: 'world' });
	}
});
