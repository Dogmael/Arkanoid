import path from 'path';
import { fileURLToPath } from 'url';
import TerserPlugin from 'terser-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
	entry: './src/arkanoid.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'arkanoid.js'
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
				type: 'json' // Permet le chargement de fichiers JSON
			}
		]
	},
	optimization: {
		minimizer: [
			new TerserPlugin()
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'src', 'arkanoid.html'), // Utilise un chemin absolu
			filename: 'arkanoid.html',
			inject: false, // Désactive l'injection automatique des scripts
		}),
		new MiniCssExtractPlugin({
			filename: 'arkanoid.css' // Nom du fichier CSS dans `dist`
		})
	],
	resolve: {
		extensions: ['.js']
	},
	devServer: {
		static: {
			directory: __dirname + '/dist', // Dossier à servir
		},
		port: 3000, // Port sur lequel le serveur est lancé
		open: true, // Ouvre automatiquement le navigateur
		historyApiFallback: {
			index: 'arkanoid.html', // ouvre automatiquement la bonne page plutôt que le dossier
		},
	},
};
