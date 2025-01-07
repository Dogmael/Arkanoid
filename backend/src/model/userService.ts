import prisma from '../plugins/prisma';

export async function addUser(user: any) {
    return await prisma.user.create({ data: user });
}