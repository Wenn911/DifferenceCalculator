import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/comparator.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getFixturePath = (fileName) => {
  const fixturePath = path.join(__dirname, '..', '__fixtures__', fileName);
  return fixturePath;
};

const expectedDataStylish = fs.readFileSync(
  getFixturePath('output.txt'),
  'utf8',
);
const expectedDataJson = fs.readFileSync(
  getFixturePath('outputJson.txt'),
  'utf8',
);
const expectedDataPlain = fs.readFileSync(
  getFixturePath('outputPlain.txt'),
  'utf8',
);

test('compare json files (default output):', () => {
  const actualData = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(actualData).toBe(expectedDataStylish);
});
test('compare flat yml files (plain output):', () => {
  const actualData = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'plain');
  expect(actualData).toBe(expectedDataPlain);
});
test('compare json file with yml file (json output):', () => {
  const actualData = genDiff(getFixturePath('file1.json'), getFixturePath('file2.yml'), 'json');
  expect(actualData).toBe(expectedDataJson);
});
