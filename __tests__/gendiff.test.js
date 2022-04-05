import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import comparator from '../src/comparator.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getFixturePath = (fileName) => {
  const fixturePath = path.join(__dirname, '..', '__fixtures__', fileName);
  return fixturePath;
};
const fixPath = '__fixtures__/';

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
  const actualData = comparator(`${fixPath}file1.json`, `${fixPath}file2.json`);
  expect(actualData).toBe(expectedDataStylish);
});
test('compare flat yml files (plain output):', () => {
  const actualData = comparator(`${fixPath}file1.yml`, `${fixPath}file2.yml`, 'plain');
  expect(actualData).toBe(expectedDataPlain);
});
test('compare json file with yml file (json output):', () => {
  const actualData = comparator(`${fixPath}file1.json`, `${fixPath}file2.yml`, 'json');
  expect(actualData).toBe(expectedDataJson);
});
