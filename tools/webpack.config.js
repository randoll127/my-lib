import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import WebpackStrip from 'strip-loader';
const postcssImport = require('postcss-import');
const postcssMixins = require('postcss-mixins');
const postcssNested = require('postcss-nested');
const postcssCssnext = require('postcss-cssnext');

const DEBUG = false;
const VERBOSE = true;

var rootPath = process.cwd();

const entry = {
  'api/index': path.join(rootPath,"src/api/index.js"),
  'db/index': path.join(rootPath,"src/db/index.js"),
  'log/index': path.join(rootPath,"src/log/index.js")
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

const plugins = [
  new ExtractTextPlugin('public/styles/lubase.css'),
];

const loaders = DEBUG ? ['react-hot', 'babel-loader'] : ['babel-loader', WebpackStrip.loader('console.log', 'console.error')];

const moduleConfig = {
  loaders: [{
    test: /\.jsx?$/,
    loaders,
  }, {
    test: /\.(png|jpg|jpeg|gif)$/,
    loader: 'url-loader?limit=10&name=public/images/[name].[ext]',
  }, {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader'),
  }],
};

const config = {
  entry,
  output: {
    path: path.join(rootPath,"lib"),
    filename: '[name].js',
    library: 'my-lib',
    libraryTarget: 'umd'
  },
  externals:{'whatwg-fetch':'whatwg-fetch','dateformat':'dateformat','mysql':'mysql'},
  module: moduleConfig,
  plugins,
  postcss: function plugin(bundler) {
    return [
      postcssImport({
        addDependencyTo: bundler,
      }),
      postcssMixins(),
      postcssNested(),
      postcssCssnext({
        autoprefixer: AUTOPREFIXER_BROWSERS,
      }),
    ];
  },
};

export default config;
