import buildApp from './app';

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
	port: parseInt(process.env.PORT ?? '3000'),
	host: '::',
}, (err, address) => {
	if (err) {
		server.log.error(err);
		process.exit(1);
	}
	console.log(`Server is running at ${address}`);
});
