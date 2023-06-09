const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
  mode: "development",
  entry: "./src/index.js",
  plugins: [
    new HtmlWebpackPlugin({
      title: "Wepback App Testing",
      filename: "index.html",
      template: "src/template.html",
    }),
  ],
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: '[name][ext]',
    clean: true 
  },
  module:{
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\(.*?\.(png|svg|jpg|jpeg|gif)\)$/i,
        type: 'asset/resource'
      }
    ],
  },
}
