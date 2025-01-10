import { prisma } from '../plugins/prismaPlugin';

// Contains business logic, separated from controllers to keep them slim and reusable.

export async function addUser(user: any) {
    return await prisma.user.create({ data: user });
}

export async function deleteUser(email: string) {
    return await prisma.user.delete({
        where: {
            email: email
        }
    })
}

export async function updateBestScore(email: string, bestScore: number) {
    return await prisma.user.update({
        where : {
            email: email
        },
        data: {
            bestScore: bestScore
        }
    })
}

export async function getLeaderBoard() {
    return await prisma.user.findMany({
        orderBy: {
            bestScore: 'desc',
        },
        take: 10,
        select : {
            name : true,
            bestScore : true   
        }
    })
}