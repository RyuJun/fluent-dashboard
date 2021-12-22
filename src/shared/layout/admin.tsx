import { darkTheme, lightTheme } from 'utils/theme/theme';

import React from 'react';
import { ThemeProvider } from '@fluentui/react';
import { settingsState } from 'shared/context/settings.recoil';
import { useRecoilValue } from 'recoil';

const Admin = (): React.ReactElement => {
  const settings = useRecoilValue(settingsState);

  return (
    <React.Suspense fallback={null}>
      <ThemeProvider applyTo="body" theme={settings.theme === 'light' ? lightTheme : darkTheme}>
        하윙~
      </ThemeProvider>
    </React.Suspense>
  );
};

export default Admin;
