import { FastifyInstance } from 'fastify';
import { addUserHandler, deleteUserHandler, getLeaderBoardHandler, updateBestScoreHandler } from '../controllers/usersController';
import { addUserSchema, updateBestScoreSchema } from '../schemas/usersSchema';

export default async function userRoutes (fastify: FastifyInstance) {
	fastify.post('/users', { schema: addUserSchema }, addUserHandler);
	fastify.delete('/users/:userName', deleteUserHandler);
	fastify.put('/users/:userName/:bestScore', { schema: updateBestScoreSchema }, updateBestScoreHandler);
	fastify.get('/users/leaderBoard', getLeaderBoardHandler);
}
