import { beforeEach, describe, expect, it } from '@jest/globals';
import buildApp from '../src/app';
import { prisma } from '../src/plugins/prismaPlugin';

describe('API Tests', () => {
	const app = buildApp();

	// Test fixtures
	const testUser = {
		userName: 'testUser',
		email: 'testUser@example.com'
	};

	const testUsers = [
		{ userName: 'user1', email: 'user1@example.com', bestScore: 100 },
		{ userName: 'user2', email: 'user2@example.com', bestScore: 200 },
		{ userName: 'user3', email: 'user3@example.com', bestScore: 150 }
	];

	beforeEach(async () => {
		// Clean database before each test
		await prisma.user.deleteMany();
	});

	describe('User Management', () => {
		describe('POST /users', () => {
			it('should create a new user successfully', async () => {
				const response = await app.inject({
					method: 'POST',
					url: '/users',
					payload: testUser
				});

				expect(response.statusCode).toBe(201);
				expect(response.headers['content-type']).toMatch(/json/);
				expect(response.json()).toHaveProperty('pkUser');
				expect(response.json().userName).toBe(testUser.userName);
				expect(response.json().email).toBe(testUser.email);
			});

			it('should fail when creating user with duplicate username', async () => {
				// Create first user
				await app.inject({
					method: 'POST',
					url: '/users',
					payload: testUser
				});

				// Try to create duplicate user
				const response = await app.inject({
					method: 'POST',
					url: '/users',
					payload: testUser
				});

				expect(response.statusCode).toBe(409);
			});

			it('should fail when creating user with duplicate email', async () => {
				// Create first user
				await app.inject({
					method: 'POST',
					url: '/users',
					payload: testUser
				});

				// Try to create user with same email but different username
				const duplicateEmailUser = {
					userName: 'differentUser',
					email: testUser.email
				};

				const response = await app.inject({
					method: 'POST',
					url: '/users',
					payload: duplicateEmailUser
				});

				expect(response.statusCode).toBe(409);
			});

			it('should fail when required fields are missing', async () => {
				const invalidUser = {
					userName: 'testuser'
					// missing email
				};

				const response = await app.inject({
					method: 'POST',
					url: '/users',
					payload: invalidUser
				});

				expect(response.statusCode).toBe(400);
			});
		});

		describe('DELETE /users/:userName', () => {
			it('should delete an existing user', async () => {
				// Create a user first
				await app.inject({
					method: 'POST',
					url: '/users',
					payload: testUser
				});

				// Delete the user
				const response = await app.inject({
					method: 'DELETE',
					url: `/users/${testUser.userName}`
				});

				expect(response.statusCode).toBe(204);
			});

			it('should return 404 when deleting non-existent user', async () => {
				const response = await app.inject({
					method: 'DELETE',
					url: '/users/nonexistentuser'
				});

				expect(response.statusCode).toBe(404);
			});
		});
	});

	describe('Score Management', () => {
		describe('PUT /users/:userName/:bestScore', () => {
			beforeEach(async () => {
				// Create test user before each score test
				await app.inject({
					method: 'POST',
					url: '/users',
					payload: testUser
				});
			});

			it('should update best score for existing user', async () => {
				const response = await app.inject({
					method: 'PUT',
					url: `/users/${testUser.userName}/1000`
				});

				expect(response.statusCode).toBe(204);
			});

			it('should fail when updating score for non-existent user', async () => {
				const response = await app.inject({
					method: 'PUT',
					url: '/users/nonexistentuser/1000'
				});

				expect(response.statusCode).toBe(404);
			});

			it('should fail when score is invalid', async () => {
				const response = await app.inject({
					method: 'PUT',
					url: `/users/${testUser.userName}/invalid`
				});

				expect(response.statusCode).toBe(400);
			});
		});

		describe('GET /users/leaderBoard', () => {
			it('should return empty leaderboard when no users exist', async () => {
				const response = await app.inject({
					method: 'GET',
					url: '/users/leaderBoard'
				});

				expect(response.statusCode).toBe(200);
				expect(response.json()).toEqual([]);
			});

			it('should return sorted leaderboard with multiple users', async () => {
				// Create and set scores for multiple users
				for (const user of testUsers) {
					await app.inject({
						method: 'POST',
						url: '/users',
						payload: { userName: user.userName, email: user.email }
					});

					await app.inject({
						method: 'PUT',
						url: `/users/${user.userName}/${user.bestScore}`
					});
				}

				const response = await app.inject({
					method: 'GET',
					url: '/users/leaderBoard'
				});

				expect(response.statusCode).toBe(200);
				const leaderboard = response.json();
				expect(leaderboard).toHaveLength(3);
				expect(leaderboard[0].userName).toBe('user2'); // Highest score
				expect(leaderboard[0].bestScore).toBe(200);
				expect(leaderboard[1].userName).toBe('user3'); // Second highest
				expect(leaderboard[2].userName).toBe('user1'); // Lowest score
			});
		});
	});
});
