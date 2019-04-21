const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
//   .BundleAnalyzerPlugin;

const paths = require('./paths');

module.exports = env => {
  const { PLATFORM, VERSION } = env;
  return merge([
    {
      entry: [paths.appIndexJs],
      resolve: {
        // File extensions. Add others and needed (e.g. scss, json)
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', '.css'],
        modules: ['node_modules'],
        alias: {
          images: path.resolve(paths.appAssets)
        }
      },
      module: {
        rules: [
          {
            test: /\.(ts|tsx)$/,
            loader: 'awesome-typescript-loader',
            exclude: /(node_modules)/
          },
          {
            test: /\.(js|jsx)$/,
            exclude: /(node_modules)/,
            use: {
              loader: 'babel-loader'
            }
          },
          {
            // look for .css or .scss files
            test: /\.(css|scss)$/,
            // in the `src` directory
            include: [
              path.resolve(paths.appSrc),
              path.resolve('node_modules/react-big-scheduler/lib/css/'),
              path.resolve('node_modules/antd/lib/')
            ],
            use: [
              PLATFORM === 'production'
                ? MiniCssExtractPlugin.loader
                : 'style-loader',
              'css-loader',
              'sass-loader'
            ]
          }
        ]
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env.VERSION': JSON.stringify(VERSION),
          'process.env.PLATFORM': JSON.stringify(PLATFORM)
        }),
        new HtmlWebpackPlugin({
          inject: true,
          favicon: `${paths.appAssets}/icons/favicon.png`,
          template: paths.appHtml
        }),
        new CopyWebpackPlugin([{ from: 'src/assets' }])
      ]
    }
  ]);
};
