import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

export default {
  output: {
    path: path.resolve('dist'),
    filename: '[name].js',
    publicPath: '/',
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.styl', '.ico'],
  },

  mode: process.env.NODE_ENV || 'development',

  entry: {
    client: './src/index.tsx',
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.styl$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'stylus-loader'],
      },
      {
        test: /\.(svg|png|gif|jpg|ico)$/,
        use: {
          loader: 'file-loader',
          options: {
            context: './static',
            name: 'root[path][name].[ext]',
          },
        },
      },
    ],
  },

  plugins: [new HtmlWebpackPlugin({ template: './static/index.html' })],

  devServer: {
    port: 3000,
    contentBase: './static',
    historyApiFallback: true,
  },

  devtool: 'cheap-module-source-map',
}
