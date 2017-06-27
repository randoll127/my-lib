import del from 'del';
import _ from 'lodash';

async function clean() {
  // build path is relative from project path,don't run it in this folder
  const delArr = _.union([], ['lib/', '.tmp', '!lib/.git']);
  await del(delArr, {
    dot: true,
  });
}

export default clean;
