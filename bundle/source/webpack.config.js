const path = require('path')
const source = path.resolve(__dirname, 'src')
const root = path.resolve(source, 'renderer')

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
      '@root': root,
      '@css': path.resolve(root, 'css/modules'),
    },
    extensions: ['.js', '.jsx'],
  },
}
