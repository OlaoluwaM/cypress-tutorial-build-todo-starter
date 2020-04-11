const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: "./src/index.html",
  filename: "index.html",
  inject: "body",
});

module.exports = (env) => {
  const { NODE_ENV } = env;

  return {
    entry: ["babel-polyfill", "./src/index.js"],
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "app.bundle.js",
    },
    module: {
      rules: [
        { test: /\.js$/, loader: "babel-loader", exclude: /node_modules/ },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    devtool: "source-map",
    plugins: [HtmlWebpackPluginConfig],
    mode: NODE_ENV === "production" ? "production" : "development",
  };
};
