const path = require('path')

module.exports = {
  entry: './public/App.jsx',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  devServer: {
    inline: true,
    contentBase: path.join(__dirname, 'public')
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  devtool: 'source-map'
}
