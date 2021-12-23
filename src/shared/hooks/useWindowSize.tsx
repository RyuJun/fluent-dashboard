import React from 'react';
import { RESPONSIVE } from 'shared/variables/common.constants';

function useWindowSize() {
  const [size, setSize] = React.useState([0, 0, '']);

  React.useLayoutEffect(() => {
    function updateSize() {
      let device = '';
      if (window.innerWidth >= RESPONSIVE.WINDOW_SIZE_LG) {
        device = 'big';
      } else if (window.innerWidth >= RESPONSIVE.WINDOW_SIZE_MD) {
        device = 'pc';
      } else if (window.innerWidth >= RESPONSIVE.WINDOW_SIZE_XSM) {
        device = 'tablet';
      } else {
        device = 'mobile';
      }
      setSize([window.innerWidth, window.innerHeight, device]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

export default useWindowSize;
