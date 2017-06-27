import path from 'path';
import Promise from 'bluebird';
import fs from 'fs';
import lufs from './lib/lufs';
import {
  BUILD_PATH,
  SRC_PATH,
}
from './base.config';

async function exec(ncp, sourceFolder) {
  const ncps = [];
  const targetFolder = `${BUILD_PATH}${path.sep}public${path.sep}images${path.sep}`;
  if (fs.existsSync(sourceFolder)) {
    const stats = fs.statSync(sourceFolder);
    if (stats.isDirectory()) {
      if (!fs.existsSync(targetFolder)) {
        lufs.makeDir(targetFolder);
      }
      console.log('开始复制文件夹: ' + sourceFolder, ' 到--> ', targetFolder);
      ncps.push(ncp(sourceFolder, targetFolder));
    }
  } else {
    console.error('warning: 你居然不设置public文件夹,打包不成功!');
  }

  await Promise.all(ncps);
}

/**
 * Copies static sourceFolder such as robots.txt, favicon.ico to the
 * output (build) folder.
 */
async function copy() {
  const ncp = Promise.promisify(require('ncp'));
  // For just copy bo pages
  try {
    exec(ncp, `${SRC_PATH}${path.sep}public${path.sep}images${path.sep}`);
  } catch (e) {
    console.error('copy error!', e);
  }
}

export default copy;
