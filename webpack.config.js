const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = [
  {
    entry: './src/index.js',
    output: {
      filename: 'app.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: './',
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        inject: false,
      }),
      new MiniCssExtractPlugin({
        filename: 'estilos.css',
      }),
      new ReplaceInFileWebpackPlugin([
        {
          dir: 'dist',
          test: /\.html$/,
          rules: [
            {
              search: '/style/css/estilos.css',
              replace: '/estilos.css',
            },
            {
              search: '/js/app.js',
              replace: 'app.js',
            },
          ],
        },
      ]),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'src/img',
            to: path.resolve(__dirname, 'dist/img'),
          },
        ],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
      ],
    },
    optimization: {
      minimize: true,
      minimizer: [
        new CssMinimizerPlugin({
          parallel: true,
          minimizerOptions: {
            discardComments: { removeAll: true },
          },
        }),
        new TerserPlugin({
          parallel: true,
          terserOptions: {
            format: {
              comments: false,
            },
          },
        }),
      ],
    },
  },
  {
    entry: './server.dev.js',
    target: 'node',
    externals: [nodeExternals()],
    output: {
      filename: 'server.prod.js',
      path: path.resolve(__dirname),
    },
    plugins: [
      new ReplaceInFileWebpackPlugin([
        {
          dir: path.resolve(__dirname),
          test: /\/server\.prod\.js/i,
          rules: [
            {
              search: 'src',
              replace: 'dist',
            },
            {
              search: '/src',
              replace: '/dist',
            },
          ],
        },
      ]),
    ],
  },
];
