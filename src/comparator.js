import path from 'path';
import fs from 'fs';
import parseFile from './parsers.js';
import buildDiffTree from './buildDiffTree.js';
import makeFormattedOutput from './formatters/index.js';

const getExtension = (filePath) => path.extname(filePath).slice(1);

const comparator = (path1, path2, format = 'stylish') => {
  const workingPath1 = path.resolve(process.cwd(), path1);
  const workingPath2 = path.resolve(process.cwd(), path2);

  const fileContent1 = fs.readFileSync(workingPath1, 'utf8');
  const fileContent2 = fs.readFileSync(workingPath2, 'utf8');

  const obj1 = parseFile(fileContent1, getExtension(path1));
  const obj2 = parseFile(fileContent2, getExtension(path2));

  const tree = buildDiffTree(obj1, obj2);
  const result = makeFormattedOutput(tree, format);

  return result;
};

export default comparator;
