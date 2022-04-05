#!/usr/bin/env node

import { program } from 'commander';
import comparator from '../index.js';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.');

program
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>');

program.action((filepath1, filepath2) => {
  const { format } = program.opts();
  console.log(comparator(filepath1, filepath2, format));
});

program
  .parse(process.argv);
