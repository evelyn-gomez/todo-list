const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path'); 
module.exports = {
  mode: 'development', 
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins:[
    new HtmlWebpackPlugin({
      title: 'Wepback App Testing', 
      filename: 'index.html',
      template: 'src/template.html', 
    })
  ]
};