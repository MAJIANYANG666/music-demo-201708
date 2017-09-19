const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCASS = new ExtractTextPlugin('dist/[name]-one.css');
const extractLESS = new ExtractTextPlugin('dist/[name]-two.css');
const extractCSS = new ExtractTextPlugin('dist/[name]-three.css');

module.exports = {
  entry: './src/home1.js',
  output: {
    filename: './dist/bundle.js'
  },
  plugins: [
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



