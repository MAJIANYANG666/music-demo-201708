module.exports = {
  entry: './src/home1.js',
  output: {
    filename: './dist/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader','autoprefixer-loader' ]
      },
      {
        test: /\.scss$/,
        use: [ 'style-loader', 'css-loader','sass-loader','autoprefixer-loader' ]
      },
      {
        test: /\.less$/,
        use: [ 'style-loader', 'css-loader','less-loader','autoprefixer-loader' ]
      }
    ] 
  }
}



