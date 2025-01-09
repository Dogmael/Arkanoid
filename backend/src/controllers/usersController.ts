import { FastifyReply, FastifyRequest } from 'fastify';
import { addUser, deleteUser, updateBestScore } from '../service/usersService';

// Contrôleur : Logique métier
// On appel pas l'ORM d'ici mais on appel le service qui va appeler l'ORM

export async function addUserHandler(request: FastifyRequest, reply: FastifyReply) {
    const user = request.body;
    const result = await addUser(user);
    reply.status(201).send(result); // 201 : Create
}

type emailParamsType = { email : string} // Utiliser un interface plutôt ?

export async function deleteUserHandler(request: FastifyRequest<{Params: emailParamsType}>, reply: FastifyReply) {
    const {email} = request.params
    const result = await deleteUser(email);
    reply.status(204).send(result); // 204 : No Content to return, successful response
}   

type updateBestScoreParamsType = {
    email : string,
    bestScore : number
}

export async function updateBestScoreHandler(request: FastifyRequest<{Params : updateBestScoreParamsType}>, reply : FastifyReply) {
    const {email, bestScore} = request.params
    const result = await updateBestScore(email, bestScore)
    reply.status(204).send(result); // 204 : No Content successful response
}