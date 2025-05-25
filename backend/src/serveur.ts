import buildApp from './app.js';

const isDev = process.env.NODE_ENV !== 'production';

const server = buildApp({
	logger: isDev
		? {
			level: 'info',
			transport: {
				target: 'pino-pretty',
				options: {
					colorize: true, // Coloration pour un meilleur rendu en dev
				},
			},
		}
		: {
			level: 'warn',
		},
});

server.listen({ 
	port: 3000,
	host: '0.0.0.0',
}, (err, address) => {
	if (err) {
		server.log.error(err);
		process.exit(1);
	}
	console.log(`Server is running at ${address}`);
});
