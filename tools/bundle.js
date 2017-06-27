import webpack from 'webpack';
import webpackConfig from './webpack.config';

function bundle() {
  return new Promise((resolve, reject) => {
    const bundler = webpack(webpackConfig);
    function onComplete(err) {

      if (err) {
        reject(err);
      }
      resolve();
    }

    if (global.WATCH) { // false
      bundler.watch(200, onComplete);
    } else {
      bundler.run(onComplete);
    }
  });
}

export default bundle;
