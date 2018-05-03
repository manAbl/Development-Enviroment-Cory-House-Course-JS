import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  debug: true,
  devtool: 'source-map',
  noInfo: false,
  entry: {
    vendor: path.resolve(__dirname, 'src/vendor'),
    main: path.resolve(__dirname, 'src/index')
    },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    //Extract the css into a file with a hash in file name
    new ExtractTextPlugin('[name].[chunkhash].css]'),

    //Hash the file name using md5 so the hash only change when the content of the file change
    new WebpackMd5Hash(),

    //Use CommonChunkPluggin to create a separate bundle
    //of vendor libraries so that they're cached separately
    new webpack.optimize.CommonChunkPluggin({
      name:'vendor'
    }),

    //Create HTML file that includes a reference to bundle.js
    new HtmlWebpackPlugin({
      template:'src/index.html',
      inject: true
    }),
    //Eliminate duplicate packages when generating bundle
    new webpack.optimize.DedupePlugin(),
    //Minify JS
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap')}
    ]
  }
}
