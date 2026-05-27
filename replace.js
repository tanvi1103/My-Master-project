const fs = require('fs');
const path = require('path');

const targetDirs = [
  'frontend/src',
  'backend',
  'README.md'
];

function replaceInFile(filePath) {
  try {
    if (filePath.endsWith('.png') || filePath.endsWith('.jpg') || filePath.endsWith('.jpeg') || filePath.endsWith('.svg') || filePath.endsWith('.ico') || filePath.endsWith('.pdf')) {
      return;
    }
    const content = fs.readFileSync(filePath, 'utf8');
    let newContent = content.replace(/Bonga University/gi, (match) => {
      if (match === 'BONGA UNIVERSITY') return 'MIT ADT UNIVERSITY';
      if (match === 'bonga university') return 'mit adt university';
      return 'MIT ADT University';
    });
    if (content !== newContent) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`Replaced in ${filePath}`);
    }
  } catch (err) {
    // console.error(err);
  }
}

function traverseDir(dir) {
  try {
    if (fs.statSync(dir).isFile()) {
      replaceInFile(dir);
      return;
    }
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      if (file === 'node_modules' || file === '.git' || file === 'package-lock.json') continue;
      if (fs.statSync(fullPath).isDirectory()) {
        traverseDir(fullPath);
      } else {
        replaceInFile(fullPath);
      }
    }
  } catch(err) {}
}

targetDirs.forEach(traverseDir);
