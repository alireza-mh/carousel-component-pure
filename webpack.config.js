const webpack = require("webpack");
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

/* variables */
/* global process __dirname module */
const isProduction = process.argv.indexOf('-p') >= 0;
const sourcePath = path.join(__dirname, "./src");

// babel config
const babelLoaderConfig = {
  loader: "babel-loader",
  options: { babelrc: true },
};

module.exports = {
  context: sourcePath,
  entry: "./index.ts",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      // .js, .ts
      {
        test: /\.(js|ts)$/,
        exclude: /node_modules/,
        use: [babelLoaderConfig],
      },
      {
        test: /\.css$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : "style-loader",
          {
            loader: "css-loader",
          },
        ],
      },
      {
        test: /\.(svg|gif|jpe?g|png|eot|ttf|woff2?)$/,
        loader: 'url-loader',
        query: {
          limit: 3000,
          name: 'assets/[name].[ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
      inject: "head",
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }),
    new MiniCssExtractPlugin({
      disable: !isProduction,
      filename: "[name][hash].css",
      chunkFilename: "[name].[chunkhash:4].css",
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
    }),
  ],
  resolve: {
    extensions: [".js", ".ts"],
    alias: {
      src: path.resolve(__dirname, "src"),
    },
  }
};
