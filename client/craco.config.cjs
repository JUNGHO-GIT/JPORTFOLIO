// craco.config.cjs

const { CracoAliasPlugin } = require('react-app-alias');
const CompressionPlugin = require('compression-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { SwcMinifyWebpackPlugin } = require('swc-minify-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const os = require('os');

// -------------------------------------------------------------------------------------------------
module.exports = {

  // 1. plugins ------------------------------------------------------------------------------------
  plugins: [
    {
      plugin: CracoAliasPlugin,
    },
  ],

  // 2. babel --------------------------------------------------------------------------------------
  babel: {
    plugins: [
      ['@babel/plugin-syntax-dynamic-import'],
      ['@babel/plugin-proposal-optional-chaining'],
      ['@babel/plugin-proposal-nullish-coalescing-operator']
    ],
  },

  // 3. webpack ------------------------------------------------------------------------------------
  webpack: {
    configure: (webpackConfig, { env }) => {

      // 1. 공통 설정 ------------------------------------------------------------------------------
      // 공통 module 설정
      webpackConfig.module.rules.unshift({
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        use: [
          {
            loader: 'thread-loader',
            options: {
              workers: os.cpus().length - 1,
              workerParallelJobs: 75,
              poolRespawn: false,
              poolTimeout: 2000,
              poolParallelJobs: 75
            },
          },
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                env === 'development' && require.resolve('react-refresh/babel')
              ].filter(Boolean),
            },
          },
        ],
        exclude: /node_modules/,
      });

      // 공통 plugin 설정
      webpackConfig.plugins.push(
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(env),
          'process.env.PUBLIC_URL': JSON.stringify(process.env.PUBLIC_URL),
        })
      );

      // 공통 output 설정
      webpackConfig.output = {
        path: path.resolve(__dirname, 'build'),
        publicPath: `${process.env.PUBLIC_URL}`,
        filename: 'static/js/[name].[contenthash:8].js',
        chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
        clean: true,
      };

      // 공통 cache 설정
      webpackConfig.cache = {
        type: 'filesystem',
        buildDependencies: {
          config: [__filename],
        },
      };

      // 2. dev 설정 -------------------------------------------------------------------------------
      if (env === 'development') {
        webpackConfig.devServer = {
          ...webpackConfig.devServer,
          open: true,
          compress: true,
          hot: true,
          historyApiFallback: true,
          overlay: true,
        };
        webpackConfig.plugins.push(
          new ReactRefreshWebpackPlugin(),
        );
      }

      // 3. production 설정 -----------------------------------------------------------------------
      else if (env === 'production') {
        webpackConfig.optimization = {
          sideEffects: true,
          minimize: true,
          moduleIds: 'deterministic',
          minimizer: [
            new CssMinimizerPlugin({
              minimizerOptions: {
                preset: [
                  'default',
                  {
                    discardComments: { removeAll: true },
                    zindex: false,
                  },
                ],
              },
            }),
            new SwcMinifyWebpackPlugin({
              compress: {
                unused: true,
                dead_code: true,
                collapse_vars: true,
                comparisons: true,
                conditionals: true,
                evaluate: true,
                booleans: true,
                loops: true,
                if_return: true,
                join_vars: true,
                sequences: true,
                drop_console: true,
                drop_debugger: true,
              },
              format: {
                comments: 'all',
                semicolons: true,
              },
              mangle: {
                toplevel: true,
              },
            }),
          ],
          splitChunks: {
            chunks: 'all',
            name: false,
            cacheGroups: {
              vendors: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendors',
                chunks: 'all',
              },
              commons: {
                test: /[\\/]src[\\/]/,
                minChunks: 2,
                name: 'commons',
                chunks: 'all',
              },
            },
          },
          runtimeChunk: 'single',
        };

        webpackConfig.plugins.push(
          new CompressionPlugin({
            filename: '[path][base].br',
            test: /\.(js|css|html|svg)$/,
            algorithm: 'brotliCompress',
            threshold: 10240,
            minRatio: 0.8,
          })
        );
      }

      // 4. return ---------------------------------------------------------------------------------
      return webpackConfig;
    },
  },
};
