const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: {
		app: './ekostat/ui/index.js'
	},
	plugins: [
		new CleanWebpackPlugin(['./ekostat/ui/dist', './ekostat/ui/tmp']),
		new HtmlWebpackPlugin({
			title: 'Vattenstatus',
			template: path.resolve(__dirname, 'ekostat/ui/index.html'),
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
		path: path.resolve(__dirname, 'ekostat/ui/dist/static'),
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