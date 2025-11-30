import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (env) => {
	const isProd = env.serve === 'prod'; // Passez "prod" ou "dev" via la ligne de commande
	const serveDirectory = isProd ? 'dist' : 'src';

	return {
		mode: isProd ? 'production' : 'development',
		entry: {
			arkanoid: './src/arkanoid.js',
			leaderboard: './src/leaderboard.js'
		},
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: '[name].js'
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
				},
				{
					test: /\.css$/,
					use: [MiniCssExtractPlugin.loader, 'css-loader']
				},
				{
					test: /\.json$/,
					type: 'json'
				}
			]
		},
		optimization: {
			minimizer: [
				new TerserPlugin({
					terserOptions: {
						compress: {
							drop_console: true, // Supprime les console.log
						},
						// mangle: { // Pas compatible avec l'accès aux propriétés par clé (ex: obj['prop'])
						// 	properties: {
						// 		regex: /^[a-zA-Z_]/, // Minifie toutes les propriétés commençant par une lettre ou un underscore
						// 	},
						// },
						format: {
							comments: false, // Supprime les commentaires
						},
					},
					extractComments: false, // Supprime les fichiers de commentaires séparés
				}),
			]
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: path.resolve(__dirname, 'src', 'arkanoid.html'),
				filename: 'arkanoid.html',
				inject: false, // Désactive l'injection automatique des scripts
			}),
			new HtmlWebpackPlugin({
				template: path.resolve(__dirname, 'src', 'leaderboard.html'),
				filename: 'leaderboard.html',
				inject: false,
			}),
			new MiniCssExtractPlugin({
				filename: '[name].css'
			})
		],
		resolve: {
			extensions: ['.js']
		},
		devServer: {
			static: {
				directory: path.resolve(__dirname, serveDirectory), // Dynamique selon l'environnement
			},
			port: 8080,
			open: true,
			historyApiFallback: {
				index: 'arkanoid.html',
			},
		},
	};
};
