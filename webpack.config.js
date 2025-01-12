const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/App.js",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "js/bundle.js",
    publicPath: "/",
    assetModuleFilename: "assets/img/[hash][ext][query]",
  },
  devServer: { port: 3001, hot: true, open: true },
  plugins: [
    new HtmlWebpackPlugin({ template: "./index.html" }),
    new MiniCssExtractPlugin({ filename: "css/mystyle.css" }),
  ],
  module: {
    rules: [
      { test: /\.css$/i, use: [MiniCssExtractPlugin.loader, "css-loader"] },
      { test: /\.(png|jpe?g|gif)$/i, type: "asset" },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", { targets: "defaults" }],
              ["@babel/preset-react", { runtime: "automatic" }],
            ],
          },
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/",
            },
          },
        ],
      },
      {
        test: /\.(txt)$/i,
        use: "raw-loader",
      },
      { test: /\.(xlsx|ods)$/, loader: "webpack-xlsx-loader" },
    ],
  },
};
