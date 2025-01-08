import { FastifyReply, FastifyRequest } from 'fastify';
import { addUser } from '../service/usersService';

//Controllers are responsible for the "what to do" part of an endpoint.
// On appel pas l'ORM d'ici mais on appel le service qui va appeler l'ORM


// Je crée un controler users (aux plusieurs) car je vaiss passer par le même controler pour ajouter, supprimer, éditer un user mais aussi pour récupérer le leaderBoard (traitement plusieurs des utilisateurs)
export async function addUserHandler(request: FastifyRequest, reply: FastifyReply) { // On garde bien le nom addUserHandler car on sépare notre logique métrer (userService) et notre logique de présentation (userController)
    const user = request.body; // Ajouter gestion type avec interface ou DTO à voir
    const result = await addUser(user);
    reply.status(201).send(result);
}