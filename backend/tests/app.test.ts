import { describe, expect, it } from '@jest/globals';
import buildApp from '../src/app';

const app = buildApp();
describe('POST /users', () => {
	it('should create a new user', async () => {
		console.log('DATABASE_URL =', process.env.DATABASE_URL);

		const newUser = {
			userName: 'testuser',
			email: 'testuser@example.com'
		};

		const response = await app.inject({
			method: 'POST',
			url: '/users',
			payload: newUser
		});

		expect(response.statusCode).toBe(201);
		expect(response.headers['content-type']).toMatch(/json/);
		expect(response.json()).toHaveProperty('pkUser');
		expect(response.json().userName).toBe(newUser.userName);
		expect(response.json().email).toBe(newUser.email);
	});
});
