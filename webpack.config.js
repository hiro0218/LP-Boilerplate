const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
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
  devtool: 'source-map',

  entry: path.join(__dirname, './src/main.js'),

  output: {
    filename: 'js/[name].js',
    path: path.join(__dirname, 'dist'),
  },

  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: true,
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
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
    new MiniCssExtractPlugin({ filename: 'css/[name].css' }),
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
