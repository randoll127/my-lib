import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const DEBUG = true;
const VERBOSE = true;

const entry = {
  'public/libs/module': ['webpack/hot/dev-server', 'webpack-hot-middleware/client', path.resolve(__dirname, '../example') + path.sep + 'app.js'],
  'public/libs/vendors': ['babel-polyfill', 'react', 'react-dom', 'fastclick', 'react-router'],
};

const AUTOPREFIXER_BROWSERS = [
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 35',
  'Firefox >= 31',
  'Explorer >= 9',
  'iOS >= 6',
  'Opera >= 12',
  'Safari >= 7.1',
];

const GLOBALS = {
  'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
  __DEV__: DEBUG,
  __CONSOLE__: DEBUG,
};

const plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    names: ['public/libs/vendors'],
    filename: 'public/libs/vendors.js',
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin(GLOBALS),
  ...(DEBUG ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: VERBOSE,
      },
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
  ]),
  ...(DEBUG ? [
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoErrorsPlugin(),
  ] : []),
  new ExtractTextPlugin('public/styles/lubase.css'),
];

const moduleConfig = {
  loaders: [{
    test: /\.jsx?$/,
    include: [
      path.resolve(__dirname, '../example'),
      path.resolve(__dirname, '../src'),
    ],
    loaders: ['react-hot', 'babel-loader'],
  }, {
    test: /\.json$/,
    loader: 'json-loader',
  }, {
    test: /\.txt$/,
    loader: 'raw-loader',
  }, {
    test: /\.(png|jpg|jpeg|gif)$/,
    loader: 'url-loader?limit=10000&name=public/images/[hash].lu.[ext]',
  }, {
    test: /\.(eot|ttf|wav|mp3|svg|woff|woff2)$/,
    loader: 'file-loader?name=public/fonts/[hash].lu.[ext]',
  }, {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader'),
  }],
};

const resolve = {
  extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx'],
};

const config = {
  entry,
  output: {
    path: path.join(__dirname, '../example'),
    publicPath: '/',
    sourcePrefix: '',
    filename: '[name].js',
    path: path.join(__dirname, '../lib'),
    publicPath: '../',
    sourcePrefix: '',
    library: 'lubase',
    libraryTarget: 'umd',
  },

  cache: DEBUG,
  debug: DEBUG,

  module: moduleConfig,
  devtool: 'cheap-module-eval-source-map',
  plugins,

  postcss: function plugin(bundler) {
    return [
      require('postcss-import')({
        addDependencyTo: bundler,
      }),
      require('postcss-mixins')(),
      require('postcss-nested')(),
      require('postcss-cssnext')({
        autoprefixer: AUTOPREFIXER_BROWSERS,
      }),
    ];
  },
  resolve,
};

export default config;
