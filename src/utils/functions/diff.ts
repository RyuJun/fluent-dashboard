import isEmpty from './isEmpty';

const compare = (a: unknown[], b: unknown[]): unknown[] => {
  return b.filter((el) => !a.map((elm1) => JSON.stringify(elm1)).includes(JSON.stringify(el)));
};

const diff = (obj1: unknown, obj2: unknown): object => {
  const result = {};

  if (Object.is(obj1, obj2)) {
    return undefined;
  }
  if (!obj2 || typeof obj2 !== 'object') {
    return obj2 as object;
  }
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    return [...compare(obj1, obj2)];
  }

  Object.keys(obj1 || {})
    .concat(Object.keys(obj2 || {}))
    .forEach((key) => {
      if (obj2[key] !== obj1[key] && !Object.is(obj1[key], obj2[key])) {
        result[key] = obj2[key];
      }
      if (typeof obj2[key] === 'object' && typeof obj1[key] === 'object') {
        const value = diff(obj1[key], obj2[key]);
        if (value !== undefined) {
          if (isEmpty(value)) delete result[key];
          else result[key] = value;
        }
      }
    });
  return result;
};
export default diff;
