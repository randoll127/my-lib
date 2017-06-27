#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import colors from 'colors';

colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red',
});

async function makeCssFile() {
  const componentsPath = path.join(process.cwd(), 'src', 'common', 'BusinessComponents');
  let componentsCSSContent = ''; // '/* version: ' + new Date() + ' */\n';
  componentsCSSContent += '@import \'luui/src/styles/variables.css\';\n';

  // Build components in one file: styles/lubase.css
  const folders = fs.readdirSync(componentsPath);
  folders.forEach(dir => {
    const folderPath = path.join(componentsPath, dir);
    if (!fs.lstatSync(folderPath).isDirectory()) {
      return false;
    }
    const files = fs.readdirSync(folderPath);
    files.forEach(file => {
      if (/\.css$/i.test(file)) {
        const filePath = file.split('.')[0];
        componentsCSSContent += `@import "../../common/BusinessComponents/${path.join(filePath, file)}";\n`;
      }
    });
    return true;
  });

  fs.writeFileSync(path.join(process.cwd(), 'src', 'public', 'styles', 'lubase.css'), componentsCSSContent);
}

export default makeCssFile;
