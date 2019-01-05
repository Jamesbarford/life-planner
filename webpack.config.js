const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const production = process.env.NODE_ENV === "production";
const analyse = process.env.NODE_ENV === "analyse";
const development = process.env.NODE_ENV === "development";
const mode = development ? "development" : "production";

console.log({ development, production, analyse });

const WebpackConfig = {
  entry: "./src/App/index.tsx",
  mode,
  output: {
      filename: "[name].[contenthash].js",
      path: path.resolve(__dirname, "dist"),
  },
  // To split chunks
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      automaticNameDelimiter: "~",
      name: true,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: "vendors",
          chunks: "all"
        }
      }
    }
  },
  devtool: process.env.NODE_ENV === "development" ? "inline-source-map" : "source-map",
  resolve: {
    extensions: [".js", ".json", ".ts", ".tsx"],
  },
  devServer: {
    contentBase: "./dist"
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: "awesome-typescript-loader"
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),
    new CleanWebpackPlugin(["dist"]),
    new HtmlWebpackPlugin({ template: "template.html" })
  ]
};

if (analyse) WebpackConfig.plugins.push(new BundleAnalyzerPlugin());

module.exports = WebpackConfig;