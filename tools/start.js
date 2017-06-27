import browserSync from 'browser-sync';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import run from './run';
import webpackConfig from './webpack.config.example';

global.WATCH = true;
global.HOT = true;
global.DEBUG = true;


const bundler = webpack(webpackConfig);


async function start() {
  await run(require('./copyForDebug'));

  browserSync({
    server: {
      baseDir: './example',

      // http://webpack.github.io/docs/webpack-dev-middleware.html
      middleware: [
        webpackDevMiddleware(bundler, {
          publicPath: webpackConfig.output.publicPath,
          stats: {
            colors: true,
            chunks: false,
            children: false,
            warnings: false,
          },
        }),

        webpackHotMiddleware(bundler),
      ],
    },

    // no need to watch '*.js' here, webpack will take care of it for us,
    // including full page reloads if HMR won't work
    files: [
      'src/**/*.html',
      'src/**/*.css', {
        match: 'src/common/BusinessComponents/**/*.css',
        fn: (event, file) => {
          console.log(file);
          // watch css change
          run(require('./makecss'));
        },
      },
    ],
  });
}

export default start;
