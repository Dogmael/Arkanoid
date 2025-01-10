import { FastifyInstance } from 'fastify';
import { addUserHandler, deleteUserHandler, updateBestScoreHandler, getLeaderBoardHandler} from '../controllers/usersController';
import { updateBestScoreSchema, addUserSchema} from '../schemas/usersSchema'

export default async function userRoutes(fastify: FastifyInstance) {
    fastify.post('/users', {schema: addUserSchema}, addUserHandler);
    fastify.delete('/users/:email', deleteUserHandler);
    fastify.put('/users/:email/:bestScore', {schema: updateBestScoreSchema}, updateBestScoreHandler);
    fastify.get('/users/leaderBoard', getLeaderBoardHandler);
}