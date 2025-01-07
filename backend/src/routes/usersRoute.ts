import { FastifyInstance } from 'fastify';
import { addUserHandler } from '../controllers/userController';

export default async function userRoutes(fastify: FastifyInstance) {
 fastify.post('/user', addUserHandler);
}