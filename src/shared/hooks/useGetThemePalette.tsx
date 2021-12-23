import { useRecoilValue } from 'recoil';
import { settingsState } from 'shared/context/settings.recoil';

import { darkTheme, lightTheme } from 'utils/theme/theme';

function useGetThemePalette(): any {
  const theme = useRecoilValue(settingsState).theme;
  return theme === 'light' ? lightTheme : darkTheme;
}

export default useGetThemePalette;
