// import fp from 'fastify-plugin';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export default fp(async function prismaPlugin(fastify) {
//   fastify.decorate('prisma', prisma);

//   fastify.addHook('onClose', async () => {
//     await prisma.$disconnect();
//   });
// });

// export { prisma };

// src/plugins/prismaPlugin.ts
import fp from 'fastify-plugin';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default fp(async function prismaPlugin (fastify) {
	fastify.decorate('prisma', prisma);

	fastify.addHook('onClose', async () => {
		await prisma.$disconnect();
	});
});

// Export direct pour l'utiliser dans d'autres fichiers
export { prisma };
