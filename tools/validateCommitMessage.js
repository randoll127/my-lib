#!/usr/bin/env node

const fs = require('fs');
const PATTERN = /^\[(FEA|BUG|ARC)\][:：]\d{1,5}[:：].+$/;
const MERGE = /^Merge branch.+$/;
const commitMsgFile = process.argv[2];

function validateMessage(message) {
  let isValid = false;
  if (PATTERN.test(message) || MERGE.test(message)) {
    isValid = true;
  }
  return isValid;
}

function firstLineFromBuffer(buffer) {
  return buffer.toString().split('\n').shift();
}

fs.readFile(
  commitMsgFile,
  (err, buffer) => {
    const msg = firstLineFromBuffer(buffer);

    if (!validateMessage(msg)) {
      console.log(`commit格式错误，请重新提交。正确格式为: ${PATTERN}`);
      process.exit(1);
    } else {
      process.exit(0);
    }
  }
);
