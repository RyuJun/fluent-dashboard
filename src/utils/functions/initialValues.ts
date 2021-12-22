import deepCopy from './deep-copy';

/**
 * 초기화 대상에 포함되는 값만 현재 값으로 대입해서 추출
 * @param currentValues 현재 값
 * @param initialValues 초기화 기준 값
 * @returns
 */
export const setInitialValues = (currentValues: any, initialValues: any): any => {
  const returnValue = { ...initialValues };

  for (const rv in returnValue) {
    let same = false;

    for (const iv in currentValues) {
      if (iv === rv) {
        same = true;
        break;
      }
    }

    if (same) {
      returnValue[rv] = currentValues[rv];
    }
  }

  return returnValue;
};

/**
 * 현재 값 중에 초기화 대상이 되는 key가 아니면 제거해서 반환
 * @param currentValues 현재 값
 * @param initialValues 초기화 기본 값
 * @returns
 */
export const excludeValues = (currentValues: any, initialValues: any): any => {
  const returnValue = { ...currentValues }; //현재 값

  for (const rv in returnValue) {
    let same = false;

    for (const iv in initialValues) {
      if (iv === rv) {
        same = true;
        break;
      }
    }

    if (!same) {
      delete returnValue[rv];
    }
  }

  return returnValue;
};

/**
 *
 * @param currentValues 반환할 현재 값
 * @param initialValues 초기화 기본 값
 * @param includes 반드시 포함시킬 값
 * @returns
 */
export const setDefaultValues = (currentValues: any, initialValues: any, includes: any): any => {
  const returnValue = { ...currentValues };

  for (const cv in currentValues) {
    //현재 값에서
    if (includes.indexOf(cv) === -1) {
      //포함 시킬 값에 없으면
      returnValue[cv] = initialValues[cv]; //반환 값에 초기값을 대입
    }
  }

  return returnValue;
};
