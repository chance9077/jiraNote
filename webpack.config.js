const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const CleanPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader'
        ]
      }
    ]
  },

  plugins: [
    // new ExtractTextPlugin('note.css'),
    new CleanPlugin.CleanWebpackPlugin(),
    new CopyPlugin([
      {
        from: path.resolve(__dirname, './src/images'),
        to: path.resolve(__dirname, './dist/images')
      },
      {
        from: path.resolve(__dirname, './src/manifest.json'),
        to: path.resolve(__dirname, './dist')
      }
    ]),
    new MiniCssExtractPlugin({
      filename: 'css/note.css'
    })
  ]
}