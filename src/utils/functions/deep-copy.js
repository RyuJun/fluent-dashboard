/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
const deepCopy = (obj) => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  const result = Array.isArray(obj) ? [] : {};
  Object.keys(obj).forEach((key) => {
    result[key] = deepCopy(obj[key]);
  });
  return result;
};

export default deepCopy;
