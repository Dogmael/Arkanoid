import { prisma } from '../plugins/prismaPlugin';

// Contains business logic, separated from controllers to keep them slim and reusable.

export async function addUser(user: any) {
    return await prisma.user.create({ data: user }); // Singulier
}

prisma.user

// import prisma from './prisma';

// fastify.get('/products', async (request, reply) => {
//   const products = await prisma.product.findMany();
//   return { data: products };
// });