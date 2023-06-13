const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: '[name][ext]'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Wepback App Testing",
      filename: "index.html",
      template: "src/template.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i, 
        use: ['style-loader', 'css-loader',]
      },
      {
        test: /\(.*?\.(png|svg|jpg|jpeg|gif)\)$/i,
        type: 'asset/resource'
      }
    ]
  }
};
