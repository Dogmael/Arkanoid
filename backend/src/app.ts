import Fastify, { FastifyServerOptions } from 'fastify';
import prismaPlugin from './plugins/prismaPlugin';
import usersRoute from './routes/usersRoute';

export default function buildApp (options: FastifyServerOptions = {}) {
	const fastify = Fastify(options);

	// Register plugins
	fastify.register(prismaPlugin);

	// Register routes
	fastify.register(usersRoute);

	return fastify;
}
