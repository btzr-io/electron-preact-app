const path = require('path')

// External root ( Outside node_modules )
const root = path.resolve(__dirname, 'src')

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
      '@root': path.resolve(root, 'renderer'),
    },
    extensions: ['.js', '.jsx'],
  },
}
