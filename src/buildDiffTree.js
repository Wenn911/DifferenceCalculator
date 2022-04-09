import _ from 'lodash';

const buildDiffTree = (data1, data2) => {
  const keys = _.sortBy(_.union(_.keys(data1), _.keys(data2)));

  return keys.map((key) => {
    switch (true) {
      case (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])): {
        return { key, status: 'nested', children: buildDiffTree(data1[key], data2[key]) };
      }

      case (!_.has(data2, key)): {
        return { key, status: 'deleted', value: data1[key] };
      }

      case (!_.has(data1, key)): {
        return { key, status: 'added', value: data2[key] };
      }

      case (_.isEqual(data1[key], data2[key])): {
        return { key, status: 'unchanged', value: data1[key] };
      }
      default:
        return {
          key,
          status: 'changed',
          oldValue: data1[key],
          newValue: data2[key],
        };
    }
  });
};

export default buildDiffTree;
