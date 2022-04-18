import yaml from 'js-yaml';

const parse = (rawData, parseType) => {
  switch (parseType) {
    case 'json':
      return JSON.parse(rawData);
    case 'yaml':
    case 'yml':
      return yaml.load(rawData);
    default:
      throw new Error(`Unknown extension: ${parseType}`);
  }
};

export default parse;
