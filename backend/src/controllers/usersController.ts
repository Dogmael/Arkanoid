import { FastifyReply, FastifyRequest } from 'fastify';
import { addUser, deleteUser, getLeaderBoard, updateBestScore } from '../service/usersService';

// Contrôleur : Logique métier
// On appel pas l'ORM d'ici mais on appel le service qui va appeler l'ORM

export async function addUserHandler (request: FastifyRequest, reply: FastifyReply) {
	const user = request.body;
	const result = await addUser(user);
	reply.status(201).send(result); // 201 : Create
}

type userNameParamsType = { userName: string }; // Utiliser un interface plutôt ?

export async function deleteUserHandler (request: FastifyRequest<{ Params: userNameParamsType }>, reply: FastifyReply) {
	const { userName } = request.params;
	await deleteUser(userName);
	reply.status(204); // 204 : No Content to return, successful response
}

type updateBestScoreParamsType = {
	userName: string,
	bestScore: number
};

export async function updateBestScoreHandler (request: FastifyRequest<{ Params: updateBestScoreParamsType }>, reply: FastifyReply) {
	const { userName, bestScore } = request.params;
	await updateBestScore(userName, bestScore);
	reply.status(204); // 204 : No Content successful response
}

export async function getLeaderBoardHandler (request: FastifyRequest, reply: FastifyReply) {
	const result = await getLeaderBoard();
	reply.status(200).send(result);
}
