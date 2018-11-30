const { join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { HotModuleReplacementPlugin } = require('webpack');
const WebPackBar = require('webpackbar');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
        includePaths: [join(__dirname, 'styles')],
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
  ];

  if (isDev) {
    plugins.push(new HotModuleReplacementPlugin());
  }

  if (!isDev) {
    // const appSrc = glob.sync(join(__dirname, 'src/**/*.tsx'));
    // plugins.push(
    //   new PurgecssPlugin({
    //     paths: [...appSrc],
    //   })
    // );
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
    contentBase: join(__dirname, 'public'),
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
    filename: '[name].[hash].bundle.js',
  };

  const devtool = isDev ? 'inline-source-map' : 'source-map';

  let config = {
    mode: argv['mode'],
    devtool,
    entry,
    module: {
      rules,
    },
    output,
    plugins,
    resolve,
  };

  if (isDev) {
    config = Object.assign(config, { devServer });
  }

  if (!isDev) {
    // const optimization = {
    //   minimize: false,
    // };
    // config = Object.assign(config, { optimization });
  }

  return config;
};
