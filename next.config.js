const path = require("path");
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

  return config;
};

const nextConfig = { ...cssSettings, webpackSettings };

module.exports = withSass(nextConfig);
