const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const pageConfig = require('./src/template/page.config');

const webpackPluginsTemplate = [];
pageConfig.forEach((config) => {
  webpackPluginsTemplate.push(
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, config.path.dist),
      template: path.resolve(__dirname, config.path.from),
      minify: false,
      inject: 'body',
      alwaysWriteToDisk: true,
      data: config.data,
    })
  );
});

const Config = {
  devtool: 'source-map',

  entry: path.join(__dirname, './src/main.ts'),

  output: {
    filename: 'js/[name].js',
    path: path.join(__dirname, 'dist'),
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        use: [
          {
            options: {
              eslintPath: require.resolve('eslint'),
            },
            loader: require.resolve('eslint-loader'),
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
      {
        test: /\.css/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
              reloadAll: true,
            },
          },
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
            loader: 'ejs-easy-loader',
          },
        ],
      },
    ],
  },

  plugins: [
    ...webpackPluginsTemplate,
    new MiniCssExtractPlugin({ filename: 'css/[name].css' }),
    new HtmlWebpackHarddiskPlugin(),
  ],
  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.js'],
  },

  devServer: {
    watchContentBase: true,
    contentBase: path.join(__dirname, 'dist/template'),
    open: true,
    inline: true,
    hot: true,
    liveReload: true,
  },
};

module.exports = Config;
