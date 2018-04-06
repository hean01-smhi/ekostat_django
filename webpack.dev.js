const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const srcPath = path.resolve(__dirname, 'ekostat/ui');

module.exports = {
  entry: {
    app: path.resolve(srcPath, 'index.js')
  },
  devtool: 'eval-source-map',
  devServer: {
    contentBase: false,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://127.0.0.1:8000',
      '/static': 'http://127.0.0.1:8000'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Vattenstatus',
      template: path.resolve(srcPath, 'index.html'),
      minify: {
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
      },
      filename: 'index.html'
    })
  ],
  output: {
    filename: '[name].js',
    publicPath: '/'
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
            name: '[name].[ext]'
          }
        }
      }
    ]
  }
};
