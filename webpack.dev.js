const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		app: './ekostat/ui/index.js'
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Vattenstatus',
			template: path.resolve(__dirname, 'ekostat/ui/index.html'),
			minify: {
				removeScriptTypeAttributes: true,
				removeStyleLinkTypeAttributes: true
			},
			filename: '../templates/app.html'
		})
	],
	output: {
		filename: 'scripts/[name].js',
		path: path.resolve(__dirname, 'ekostat/ui/tmp/static'),
		publicPath: '/static/'
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/, 
				exclude: /node_modules/, 
				use: 'babel-loader'
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: 'images/'
					}
				}
			}
		]
	}
};