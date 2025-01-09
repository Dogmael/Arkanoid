import { FastifyInstance } from 'fastify';
import { addUserHandler, deleteUserHandler, updateBestScoreHandler } from '../controllers/usersController';
import { updateBestScoreSchema } from '../schemas/usersSchema'

export default async function userRoutes(fastify: FastifyInstance) {
    fastify.post('/users', addUserHandler);
    fastify.delete('/users/:email', deleteUserHandler);
    fastify.put('/users/:email/:bestScore', {schema: updateBestScoreSchema}, updateBestScoreHandler);
}