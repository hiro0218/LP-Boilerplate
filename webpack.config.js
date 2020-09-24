const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const pathConfig = require('./src/template/path.config');

const webpackPluginsTemplate = [];
pathConfig.forEach((config) => {
  webpackPluginsTemplate.push(
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, config.dist),
      template: path.resolve(__dirname, config.from),
      minify: false,
      inject: 'body',
    })
  );
});

const Config = {
  entry: path.join(__dirname, './src/main.js'),

  output: {
    path: path.join(__dirname, 'dist'),
  },

  module: {
    rules: [
      {
        test: /\.ejs$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              attributes: false,
              minimize: false,
            },
          },
          {
            loader: 'ejs-html-loader',
          },
        ],
      },
    ],
  },

  plugins: [
    ...webpackPluginsTemplate,
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.join(__dirname, 'dist')],
    }),
  ],

  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.js'],
  },
};

module.exports = Config;
