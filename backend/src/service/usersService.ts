import { prisma } from '../plugins/prismaPlugin';

// Contains business logic, separated from controllers to keep them slim and reusable.

export async function addUser(user: any) {
    return await prisma.user.create({ data: user });
}

export async function deleteUser(email: any) {
    return await prisma.user.delete({
        where: {
            email: email
        }
    })
}