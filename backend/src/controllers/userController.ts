import { FastifyReply, FastifyRequest } from 'fastify';
import { addUser } from '../model/userService';

// On appel pas l'ORM d'ici mais on appel le model qui va appeler l'ORM

export async function addUserHandler(request: FastifyRequest, reply: FastifyReply) {
    const user = request.body;
    const result = await addUser(user);
    reply.status(201).send(result);
}