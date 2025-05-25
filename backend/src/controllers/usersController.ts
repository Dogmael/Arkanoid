import { FastifyReply, FastifyRequest } from 'fastify';
import { addUser, checkEmailExists, checkUserNameExists, deleteUser, getLeaderBoard, updateBestScore } from '../service/usersService.js';

interface AddUserBody {
	userName: string;
	email: string;
	[key: string]: any;
}

// Contrôleur : Logique métier
// On appel pas l'ORM d'ici mais on appel le service qui va appeler l'ORM

export async function addUserHandler (request: FastifyRequest<{ Body: AddUserBody }>, reply: FastifyReply) {
	const user = request.body;

	try {
		// Pre-check for userName and email existence
		const [userNameExists, emailExists] = await Promise.all([
			checkUserNameExists(user.userName),
			checkEmailExists(user.email)
		]);

		if (userNameExists) {
			return reply.status(409).send({ error: 'Username already exists' });
		}

		if (emailExists) {
			return reply.status(409).send({ error: 'Email already exists' });
		}

		const result = await addUser(user);
		return reply.status(201).send(result); // 201 : Create
	} catch (error) {
		if (error instanceof Error) {
			if (error.message === 'USERNAME_TAKEN') {
				return reply.status(409).send({ error: 'Username already exists' });
			}
			if (error.message === 'EMAIL_TAKEN') {
				return reply.status(409).send({ error: 'Email already exists' });
			}
		}
		return reply.status(500).send({ error: 'Internal server error' });
	}
}

type userNameParamsType = { userName: string }; // Utiliser un interface plutôt ?

export async function deleteUserHandler (request: FastifyRequest<{ Params: userNameParamsType }>, reply: FastifyReply) {
	const { userName } = request.params;

	const userExists = await checkUserNameExists(userName);
	if (!userExists) {
		return reply.status(404).send({ error: 'User not found' });
	}

	try {
		await deleteUser(userName);
		reply.status(204); // 204 : No Content to return, successful response
	} catch (error) {
		if (error instanceof Error && error.message === 'USER_NOT_FOUND') {
			return reply.status(404).send({ error: 'User not found' });
		}
		throw error;
	}
}

type updateBestScoreParamsType = {
	userName: string,
	bestScore: number
};

export async function updateBestScoreHandler (request: FastifyRequest<{ Params: updateBestScoreParamsType }>, reply: FastifyReply) {
	const { userName, bestScore } = request.params;
	try {
		const userExists = await checkUserNameExists(userName);
		if (!userExists) {
			return reply.status(404).send({ error: 'User not found' });
		}

		await updateBestScore(userName, bestScore);
		reply.status(204); // 204 : No Content successful response
	} catch (error) {
		if (error instanceof Error && error.message === 'USER_NOT_FOUND') {
			return reply.status(404).send({ error: 'User not found' });
		}
		throw error;
	}
}

export async function getLeaderBoardHandler (request: FastifyRequest, reply: FastifyReply) {
	const result = await getLeaderBoard();
	reply.status(200).send(result);
}
