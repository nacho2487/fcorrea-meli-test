const webpack = require("webpack");
const withSass = require("@zeit/next-sass");

const cssSettings = {
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]"
  }
};

const webpackSettings = config => {
  // Fixes npm packages that depend on `fs` module
  config.node = {
    fs: "empty"
  };

  config.plugins.push(new webpack.EnvironmentPlugin(process.env));

  return config;
};

const nextConfig = { ...cssSettings, webpackSettings };

module.exports = withSass(nextConfig);
