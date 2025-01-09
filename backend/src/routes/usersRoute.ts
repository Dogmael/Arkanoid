import { FastifyInstance } from 'fastify';
import { addUserHandler, deleteUserHandler } from '../controllers/usersController';

export default async function userRoutes(fastify: FastifyInstance) {
    fastify.post('/users', addUserHandler);
    fastify.delete('/users/:email', deleteUserHandler);
}