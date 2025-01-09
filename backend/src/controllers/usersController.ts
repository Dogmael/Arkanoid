import { FastifyReply, FastifyRequest } from 'fastify';
import { addUser, deleteUser } from '../service/usersService';

// Contrôleur : Logique métier
// On appel pas l'ORM d'ici mais on appel le service qui va appeler l'ORM

export async function addUserHandler(request: FastifyRequest, reply: FastifyReply) {
    const user = request.body;
    const result = await addUser(user);
    reply.status(201).send(result); // 201 : Create
}

type ParamsType = { email : string}

export async function deleteUserHandler(request: FastifyRequest<{Params: ParamsType}>, reply: FastifyReply) {
    const {email} = request.params
    const result = await deleteUser(email);
    reply.status(204).send(result); // 204 : No Content successful response
}