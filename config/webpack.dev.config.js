// contains configuration data related to development build

const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');

const developmentConfig = env => {
  return merge([
    {
      devtool: 'inline-source-map'
    }
  ]);
};

module.exports = env => {
  return merge(baseConfig(env), developmentConfig(env));
};
