/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
const isEmpty = (obj: unknown): boolean => {
  if (obj === null || obj === undefined) return true;
  if (obj instanceof Array && obj.length <= 0) return true;
  if ((typeof obj === 'string' || obj instanceof String) && obj.replace(/ /g, '') === '') return true;
  if (obj instanceof Object && !(typeof obj === 'function' && obj instanceof Function) && Object.keys(obj).length <= 0)
    return true;
  /* if (typeof obj === 'function' && obj instanceof Function) {
    return isEmpty((obj as Function).call());
  } */
  return false;
};
export default isEmpty;
