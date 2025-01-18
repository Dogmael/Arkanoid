import { Prisma } from '@prisma/client';
import { prisma } from '../plugins/prismaPlugin';

// Contains business logic, separated from controllers to keep them slim and reusable.

export async function checkUserNameExists (userName: string): Promise<boolean> {
	const existingUser = await prisma.user.findUnique({
		where: { userName }
	});
	return !!existingUser;
}

export async function checkEmailExists (email: string): Promise<boolean> {
	const existingUser = await prisma.user.findUnique({
		where: { email }
	});
	return !!existingUser;
}

export async function addUser (user: any) {
	try {
		return await prisma.user.create({ data: user });
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === 'P2002') {
				const target = error.meta?.target as string[];
				if (target?.includes('userName')) {
					throw new Error('USERNAME_TAKEN');
				} else if (target?.includes('email')) {
					throw new Error('EMAIL_TAKEN');
				}
			}
		}
		throw error;
	}
}

export async function deleteUser (userName: string) {
	try {
		return await prisma.user.delete({
			where: {
				userName
			}
		});
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
			throw new Error('USER_NOT_FOUND');
		}
		throw error;
	}
}

export async function updateBestScore (userName: string, bestScore: number) {
	try {
		return await prisma.user.update({
			where: {
				userName
			},
			data: {
				bestScore
			}
		});
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
			throw new Error('USER_NOT_FOUND');
		}
		throw error;
	}
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
