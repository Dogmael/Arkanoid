import { FastifyInstance } from 'fastify';
import { addUserHandler } from '../controllers/usersController';

export default async function userRoutes(fastify: FastifyInstance) {
    fastify.post('/users', addUserHandler);
}