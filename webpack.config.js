const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// External root ( Outside node_modules )
const root = path.resolve(__dirname, '../')

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      '@root': path.resolve(root, 'src'),
    },
    extensions: ['.js', '.jsx'],
  },
}
