import { prisma } from '../plugins/prismaPlugin';

// Contains business logic, separated from controllers to keep them slim and reusable.

export async function addUser (user: any) {
	return await prisma.user.create({ data: user });
}

export async function deleteUser (userName: string) {
	return await prisma.user.delete({
		where: {
			userName
		}
	});
}

export async function updateBestScore (userName: string, bestScore: number) {
	return await prisma.user.update({
		where: {
			userName
		},
		data: {
			bestScore
		}
	});
}

export async function getLeaderBoard () {
	return await prisma.user.findMany({
		orderBy: {
			bestScore: 'desc',
		},
		take: 10,
		select: {
			userName: true,
			bestScore: true
		}
	});
}
