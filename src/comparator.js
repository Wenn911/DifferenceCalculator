import path from 'path';
import fs from 'fs';
import parse from './parsers.js';
import buildDiffTree from './buildDiffTree.js';
import makeFormattedOutput from './formatters/index.js';

const parseFile = (filepath) => {
  const fileData = fs.readFileSync(filepath, 'utf-8');
  return parse(fileData, path.extname(fileData).replace('.', ''));
};

const comparator = (path1, path2, format = 'stylish') => {
  const parsedBefore = parseFile(path1);
  const parsedAfter = parseFile(path2);
  const tree = buildDiffTree(parsedBefore, parsedAfter);
  const result = makeFormattedOutput(tree, format);

  return result;
};

export default comparator;
