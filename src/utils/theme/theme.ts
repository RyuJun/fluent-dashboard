import { PartialTheme, loadTheme } from '@fluentui/react';
import {
  defaultBreadcrumbStyles,
  defaultButtonStyles,
  defaultFontStyleLarge,
  defaultFontStyleMedium,
  defaultFontStyleSmall,
  defaultFontStyleSmallPlus,
  defaultPivotStyles,
} from 'shared/variables/fluent.constants';

loadTheme({
  fonts: {
    small: defaultFontStyleSmall,
    smallPlus: defaultFontStyleSmallPlus,
    medium: defaultFontStyleMedium,
    large: defaultFontStyleLarge,
    // tiny: defaultFontStyle,
    // xSmall: defaultFontStyle,
    // smallPlus: defaultFontStyle,
    // mediumPlus: defaultFontStyle,
    // xLarge: defaultFontStyle,
    // xLargePlus: defaultFontStyle,
    // xxLarge: defaultFontStyle,
    // xxLargePlus: defaultFontStyle,
    // superLarge: defaultFontStyle,
    // mega: defaultFontStyle,
  },
  components: {
    DefaultButton: { styles: defaultButtonStyles },
    Pivot: { styles: defaultPivotStyles },
    Breadcrumb: { styles: defaultBreadcrumbStyles },
  },
});

export interface IcustomPartialTheme extends PartialTheme {
  config?: object;
  customColorsSet?: object;
}
export const lightTheme: IcustomPartialTheme = {
  config: { theme: 'right' },
  palette: {
    themePrimary: '#5299f3',
    themeLighterAlt: '#eff6fc',
    themeLighter: '#deecf9',
    themeLight: '#c7e0f4',
    themeTertiary: '#71afe5',
    themeSecondary: '#2b88d8',
    themeDarkAlt: '#106ebe',
    themeDark: '#005a9e',
    themeDarker: '#004578',
    neutralLighterAlt: '#faf9f8',
    neutralLighter: '#f3f2f1',
    neutralLight: '#edebe9',
    neutralQuaternaryAlt: '#e1dfdd',
    neutralQuaternary: '#d0d0d0',
    neutralTertiaryAlt: '#c8c6c4',
    neutralTertiary: '#a19f9d',
    neutralSecondary: '#605e5c',
    neutralPrimaryAlt: '#3b3a39',
    neutralPrimary: '#323130',
    neutralDark: '#201f1e',
    black: '#000000',
    white: '#ffffff',
  },
  customColorsSet: {
    searchListColor: '#ffffff',
    calloutBorderColor: '#3d4a54',
    layoutBorderColor: '#3d4a54',
    functionNavigationTitle: '#f5f7fb',
    functionNavigationTitleText: 'rgb(32, 31, 30)',
    functionNavigationRightContent: '#ffffff',
    customPoviotTitle: '#FAF9F8',
    customPoviotTitleSelected: '#ffffff',
    columnLayoutLabel: '#ececec',
    changeViewerTitle: '#f5f7fb',
    changeViewerBgColor: '#ffffff',
  },
};
export const darkTheme: IcustomPartialTheme = {
  components: {
    DefaultButton: {
      styles: {
        root: {
          '&:disabled': {
            background: ' rgb(36 53 66)',
          },
        },
      },
    },
  },
  config: { theme: 'dark' },
  palette: {
    themePrimary: '#5299f3',
    themeLighterAlt: '#03060a',
    themeLighter: '#0d1827',
    themeLight: '#192d49',
    themeTertiary: '#315b91',
    themeSecondary: '#4885d5',
    themeDarkAlt: '#63a2f4',
    themeDark: '#7ab0f5',
    themeDarker: '#9cc4f8',
    neutralLighterAlt: '#102637',
    neutralLighter: '#142c3f',
    neutralLight: '#1c374c',
    neutralQuaternaryAlt: '#213e54',
    neutralQuaternary: '#26445b',
    neutralTertiaryAlt: '#3e5e77',
    neutralTertiary: '#c8c8c8',
    neutralSecondary: '#d0d0d0',
    neutralPrimaryAlt: '#dadada',
    neutralPrimary: '#ffffff',
    neutralDark: '#f4f4f4',
    black: '#f8f8f8',
    white: '#0c202f',
  },
  customColorsSet: {
    searchListColor: '#0C202F',
    calloutBorderColor: '#3d4a54',
    layoutBorderColor: '#3d4a54',
    functionNavigationTitle: 'rgb(21 43 58)',
    functionNavigationTitleText: 'rgb(255, 255, 255)',
    functionNavigationRightContent: 'rgb(12, 32, 47)',
    customPoviotTitle: 'rgb(21, 43, 58)',
    customPoviotTitleSelected: 'rgb(12, 32, 47)',
    columnLayoutLabel: '#152b3a',
    changeViewerTitle: 'rgb(21 43 58)',
    changeViewerBgColor: 'rgb(12, 32, 47)',
  },
};
