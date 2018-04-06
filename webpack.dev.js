const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rootPath = path.resolve(__dirname, 'ekostat/ui');
const srcPath = path.resolve(rootPath, 'src');
const buildPath = path.resolve(rootPath, 'build');

module.exports = {
  entry: {
    app: path.resolve(srcPath, 'index.js')
  },
  devtool: 'eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Vattenstatus',
      template: path.resolve(srcPath, 'index.html'),
      minify: {
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
      },
      filename: '../templates/app.html'
    })
  ],
  output: {
    filename: 'scripts/[name].js',
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
