import yaml from 'js-yaml';

const parseFile = (data, type) => {
  switch (type) {
    case 'json':
      return JSON.parse(data);
    case 'yaml':
      return yaml.load(data);
    case 'yml':
      return yaml.load(data);
    default:
      throw new Error(`Invalid extension: ${type}!`);
  }
};

export default parseFile;
