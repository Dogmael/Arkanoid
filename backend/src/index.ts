import Fastify from 'fastify';
import prisma from './prisma';

const fastify = Fastify({ logger: true });

// Sample route
fastify.get('/', async (request, reply) => {
  return { message: 'Welcome to Fastify with TypeScript!' };
});
fastify.post('/user', async (request, reply) => {
    const { email, name, bestScore } = request.body as { email: string; name?: string; bestScore: number };
    const product = await prisma.user.create({
      data: { email, name, bestScore },
    });
    return { data: product };
  });

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