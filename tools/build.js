import run from './run';

async function build() {
  //await run(require('./makecss'));
  // await run(require('./clean'));
  await run(require('./bundle'));
  //await run(require('./copyForRelease'));
}

export default build;

