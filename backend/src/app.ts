import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import Fastify, { FastifyServerOptions } from 'fastify';
import prismaPlugin from './plugins/prismaPlugin';
import usersRoute from './routes/usersRoute';

export default function buildApp (options: FastifyServerOptions = {}) {
	const fastify = Fastify(options);

	// Register plugins
	fastify.register(prismaPlugin);
	fastify.register(helmet);
	fastify.register(cors, {
		origin: 'http://localhost:8080', // Dev config
	});

	// Register routes
	fastify.register(usersRoute);

	return fastify;
}
