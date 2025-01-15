import { describe, expect, it } from '@jest/globals';
import buildApp from '../src/app';

const app = buildApp();
describe('POST /users', () => {
	it('should create a new user', async () => {
		const newUser = {
			userName: 'testuser2',
			email: 'testuser2@example.com'
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

	it('should return 400 if required fields are missing', async () => {
		const response = await app.inject({
			method: 'POST',
			url: '/users',
			payload: {
				userName: 'testuser3'
			}
		});

		expect(response.statusCode).toBe(400);
		expect(response.headers['content-type']).toMatch(/json/);
		expect(response.json()).toHaveProperty('message');
	});
});
