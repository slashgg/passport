const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { HotModuleReplacementPlugin } = require('webpack');
const WebPackBar = require('webpackbar');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = function(env, argv) {
  const isDev = argv['mode'] === 'development';

  const sassLoader = [
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
        sourceMap: true,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: true,
      },
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: true,
        includePaths: [path.join(__dirname, 'styles')],
      },
    },
  ];

  const rules = [
    {
      test: /\.ts|tsx$/,
      exclude: /node_modules/,
      use: {
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
    },
    {
      test: /\.html$/,
      use: {
        loader: 'html-loader',
      },
    },
    {
      test: /\.scss|css$/,
      use: isDev
        ? [{ loader: 'style-loader' }].concat(sassLoader)
        : [{ loader: MiniCssExtractPlugin.loader }].concat(sassLoader),
    },
    {
      test: /\.(woff(2)?|ttf|eot)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/fonts/',
          },
        },
      ],
    },
    {
      test: /\.(png|jpg|jpeg|svg)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/images/',
          },
        },
      ],
    },
  ];

  const plugins = [
    new WebPackBar(),
    new HtmlWebpackPlugin({
      template: 'src/core/bootstrap/index.html',
      filename: './index.html',
      inject: true,
    }),
    new ForkTsCheckerWebpackPlugin({
      tslint: true,
      async: true,
    }),
    new CopyWebpackPlugin([
      {
        from: 'public',
      },
    ]),
  ];

  if (isDev) {
    plugins.push(new HotModuleReplacementPlugin());
  }

  if (!isDev) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: '[name].[hash].css',
      })
    );
  }

  const entry = {
    main: [`src/core/bootstrap/startup.${argv['mode']}.ts`, 'src/core/bootstrap/app.tsx'],
  };

  const devServer = {
    historyApiFallback: true,
    hot: true,
    port: 3000,
    contentBase: path.join(__dirname, 'public'),
  };

  const resolve = {
    extensions: ['.js', '.ts', '.tsx', '.jpg', '.svg', '.scss', '.png', '.css'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: './tsconfig.json',
        extensions: ['.ts', '.tsx'],
      }),
    ],
  };

  const output = {
    publicPath: '/',
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[hash].bundle.js',
  };

  let config = {
    mode: argv['mode'],
    entry,
    module: {
      rules,
    },
    output,
    plugins,
    resolve,
  };

  if (isDev) {
    config = Object.assign(config, { devServer, devTool: 'inline-source-map' });
  }

  if (!isDev) {
    const optimization = {
      minimizer: [
        new TerserWebpackPlugin({
          sourceMap: false,
          terserOptions: {
            output: {
              comments: false,
            },
          },
        }),
      ],
    };
    config = Object.assign(config, { optimization });
  }

  return config;
};
