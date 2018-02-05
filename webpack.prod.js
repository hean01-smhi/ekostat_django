const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const rootPath = path.resolve(__dirname, 'ekostat/ui');
const buildPath = path.resolve(rootPath, 'dist');
const tmpPath = path.resolve(rootPath, 'tmp');

module.exports = {
	entry: {
		app: path.resolve(rootPath, 'index.js')
	},
	plugins: [
		new CleanWebpackPlugin([tmpPath, buildPath]),
		new HtmlWebpackPlugin({
			title: 'Vattenstatus',
			template: path.resolve(rootPath, 'index.html'),
			minify: {
				removeScriptTypeAttributes: true,
				removeStyleLinkTypeAttributes: true
			},
			filename: '../templates/app.html'
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		}),
		new UglifyJSPlugin(),
		new ExtractTextPlugin('styles/[name].[chunkhash].css')
	],
	output: {
		filename: 'scripts/[name].[chunkhash].js',
		path: path.resolve(buildPath, 'static'),
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
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: 'css-loader'
				})
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: {
					loader: 'file-loader',
					options: {
						outputPath: 'images/'
					}
				}
			}
		]
	}
};