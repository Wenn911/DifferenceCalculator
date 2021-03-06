import _ from 'lodash';

const createIndent = (level) => {
  const replacer = '  ';
  const spacesCount = 2;
  const indentSize = level * spacesCount;

  const indents = {
    openBracket: replacer.repeat(indentSize - 1),
    closeBracket: replacer.repeat(indentSize - spacesCount),
  };

  return indents;
};

const stringify = (val, depth) => {
  if (!_.isObject(val)) {
    return val;
  }
  const indents = createIndent(depth);

  const lines = Object.entries(val).map(([key, value]) => {
    if (!_.isObject(value)) {
      return `${indents.openBracket}  ${key}: ${value}`;
    }

    return `${indents.openBracket}  ${key}: ${stringify(value, depth + 1)}`;
  });

  return ['{', ...lines, `${indents.closeBracket}}`].join('\n');
};

const makeStylishOutput = (currentValue, depth = 1) => {
  const indents = createIndent(depth);

  const lines = currentValue.map((line) => {
    const makeValue = stringify(line.value, depth + 1);

    switch (line.status) {
      case 'added':
        return [`${indents.openBracket}+ ${line.key}: ${makeValue}`];
      case 'deleted':
        return [`${indents.openBracket}- ${line.key}: ${makeValue}`];
      case 'changed':
        return [
          `${indents.openBracket}- ${line.key}: ${stringify(
            line.oldValue,
            depth + 1,
          )}\n${indents.openBracket}+ ${line.key}: ${stringify(
            line.newValue,
            depth + 1,
          )}`,
        ].join('\n');
      case 'unchanged':
        return [`${indents.openBracket}  ${line.key}: ${makeValue}`];
      case 'nested':
        return [
          `${indents.openBracket}  ${line.key}: ${makeStylishOutput(
            line.children,
            depth + 1,
          )}`,
        ];
      default:
        throw new Error(`Wrong type: ${line.status}`);
    }
  });
  return ['{', ...lines, `${indents.closeBracket}}`].join('\n');
};

export default makeStylishOutput;
