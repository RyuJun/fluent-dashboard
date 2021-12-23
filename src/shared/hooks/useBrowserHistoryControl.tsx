import React from 'react';
import { useRecoilValue } from 'recoil';
import { useHistory } from 'react-router-dom';

function useBrowserHistoryControl(): void {
  const history = useHistory();
  const [locationKeys, setLocationKeys] = React.useState([history.location.pathname]);

  React.useEffect(() => {
    // const unblock = history.block(false);
    // return () => {
    //   unblock();
    // };
  }, []);
  React.useEffect(() => {
    return history.listen((location) => {
      if (history.action === 'PUSH') {
        setLocationKeys([location.pathname]);
      }
      if (history.action === 'POP') {
        if (locationKeys[1] === location.pathname) {
          setLocationKeys(([_, ...keys]) => keys);
        } else {
          setLocationKeys((keys) => [location.pathname, ...keys]);
        }
      }
    });
  }, [locationKeys]);
}

export default useBrowserHistoryControl;
