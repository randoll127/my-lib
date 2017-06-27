import path from 'path';
import Promise from 'bluebird';
import fs from 'fs';
import lufs from './lib/lufs';
import {
  EXAMPLE_PATH,
  NM_PATH,
}
from './base.config';

async function exec(ncp, sourceNMFolder) {
  const ncps = [];
  console.log('开始处理LUUI(', sourceNMFolder, '):----------');
  const targetSrcFolderPath = `${EXAMPLE_PATH}${path.sep}public${path.sep}`;
  if (fs.existsSync(sourceNMFolder)) {
    const stats = fs.statSync(sourceNMFolder);
    if (stats.isDirectory()) {
      if (!fs.existsSync(targetSrcFolderPath)) {
        lufs.makeDir(targetSrcFolderPath);
      }
      console.log('开始复制文件夹: ' + sourceNMFolder, ' 到--> ', targetSrcFolderPath);
      ncps.push(ncp(sourceNMFolder + 'fonts', targetSrcFolderPath + 'fonts'));
      // ncps.push(ncp(sourceNMFolder + 'images', targetSrcFolderPath + 'images'));
      ncps.push(ncp(sourceNMFolder + 'styles', targetSrcFolderPath + 'styles'));
    }
  } else {
    console.error('warning: 你居然不设置public文件夹,打包不成功!');
  }

  await Promise.all(ncps);
}

/**
 * Copies static sourceNMFolder such as robots.txt, favicon.ico to the
 * output (build) folder.
 */
async function copy() {
  const ncp = Promise.promisify(require('ncp'));
  // For just copy bo pages
  try {
    exec(ncp, `${NM_PATH}${path.sep}luui${path.sep}lib${path.sep}`);
  } catch (e) {
    console.error('copy error!', e);
  }
}

export default copy;
