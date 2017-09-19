const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCASS = new ExtractTextPlugin('[name]-one.css');
const extractLESS = new ExtractTextPlugin('[name]-two.css');
const extractCSS = new ExtractTextPlugin('dist/[name]-three.css');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/home1.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin(
      {
        template:'template.html'
      }
    ),
     extractCASS,
     extractLESS,
     extractCSS,
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: extractCSS.extract([ 'css-loader', 'postcss-loader' ])
        //use: [ 'style-loader', 'css-loader','autoprefixer-loader' ]
      },
      {
        test: /\.scss$/,
        use: extractCASS.extract([ 'css-loader', 'sass-loader' ])
        //use: [ 'style-loader', 'css-loader','sass-loader','autoprefixer-loader' ]
      },
      {
        test: /\.less$/,
        use: extractLESS.extract([ 'css-loader', 'less-loader' ])
        //use: [ 'style-loader', 'css-loader','less-loader','autoprefixer-loader' ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          // eslint options (if necessary)
        }
      },
    ] 
  }
}



