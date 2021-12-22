import pioTypes from 'shared/variables/piolink-types';

/**
 * 범위 포트인지 확인(1~65535-2~65535)
 * nullable은 명시적으로 사용해야 함
 */
export const isPortRange = (val: string, nullable = true): boolean => {
  if (val) {
    const ports = val.replace(/(\s*)/g, '').split('-'); //모든 공백 제거 후 split
    return ports.length === 2
      ? ports[0] < ports[1] &&
          pioTypes.t_portnumber.pattern.test(String(ports[0])) &&
          pioTypes.t_portnumber.pattern.test(String(ports[1]))
      : false;
  } else {
    return nullable;
  }
};

/**
 * 단일 포트인지 확인(1~65535)
 * nullable은 명시적으로 사용해야 함
 */
export const isPort = (val: string, nullable = true): boolean => {
  if (val) {
    return pioTypes.t_portnumber.pattern.test(String(val));
  } else {
    return nullable;
  }
};

/**
 * 단일/범위 포트 모두에 포함되는지 확인
 * nullable은 명시적으로 사용해야 함
 */
export const usablePort = (val: string, nullable = true): boolean => {
  if (val) {
    return val.indexOf('-') !== -1 ? isPortRange(val, nullable) : isPort(val, nullable);
  } else {
    return nullable;
  }
};
