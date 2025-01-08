import Fastify from 'fastify';
import prismaPlugin from './plugins/prismaPlugin';
import usersRoute from './routes/usersRoute';

const fastify = Fastify({ logger: true });

// Register plugins
fastify.register(prismaPlugin);

// Register routes
fastify.register(usersRoute);

// Start the server
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log('Server is running at http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();