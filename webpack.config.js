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
			// {
			// 	test: /\.js$/,
			// 	exclude: /node_modules/,
			// 	use: {
			// 		loader: 'babel-loader'
			// 	}
			// },
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader']
			}
		]
	},
	optimization: {
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					compress: {}
				}
			})
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/arkanoid.html',
			filename: 'arkanoid.html'
		}),
		new MiniCssExtractPlugin({
			filename: 'arkanoid.css' // Nom du fichier CSS dans `dist`
		})
	],
	resolve: {
		extensions: ['.js']
	}
};
