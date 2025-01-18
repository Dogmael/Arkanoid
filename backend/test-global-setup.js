import { exec as execCallback } from 'child_process';
import { config } from 'dotenv';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { promisify } from 'util';

const exec = promisify(execCallback);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default async () => {
	config({ path: resolve(__dirname, '.env.test') });

	const schemaPath = resolve(__dirname, 'prisma', 'schema.prisma');

	console.log('\nResetting test database...');
	await exec(`npx prisma migrate reset --force --schema="${schemaPath}"`);
	console.log('Test database reset complete.');
};
