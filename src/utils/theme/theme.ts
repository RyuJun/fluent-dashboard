import { PartialTheme, loadTheme } from '@fluentui/react';
import {
  defaultBreadcrumbStyles,
  defaultButtonStyles,
  defaultCalloutStyles,
  defaultDropdownStyles,
  defaultFontStyleLarge,
  defaultFontStyleMedium,
  defaultFontStyleSmall,
  defaultFontStyleSmallPlus,
  defaultFontStyleXlarge,
  defaultPanelStyles,
  defaultPivotStyles,
} from 'shared/variables/fluent.constants';

loadTheme({
  fonts: {
    small: defaultFontStyleSmall,
    smallPlus: defaultFontStyleSmallPlus,
    medium: defaultFontStyleMedium,
    large: defaultFontStyleLarge,
    xLarge: defaultFontStyleXlarge,
    // tiny: defaultFontStyle,
    // xSmall: defaultFontStyle,
    // smallPlus: defaultFontStyle,
    // mediumPlus: defaultFontStyle,
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
    Dropdown: { styles: defaultDropdownStyles },
    Panel: { styles: defaultPanelStyles },
    Callout: { styles: defaultCalloutStyles },
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
    functionNavigationRightContent: '#ffffff',
    customPoviotTitle: '#FAF9F8',
    customPoviotTitleSelected: '#ffffff',
    changeViewerTitle: '#f5f7fb',
  },
};
export const darkTheme: IcustomPartialTheme = {
  components: {
    DefaultButton: {
      styles: {
        root: {
          '&:disabled': {
            background: 'rgb(132 132 132)',
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
    neutralLighterAlt: '#32343c',
    neutralLighter: '#393b44',
    neutralLight: '#454751',
    neutralQuaternaryAlt: '#4c4f59',
    neutralQuaternary: '#52555f',
    neutralTertiaryAlt: '#6d707a',
    neutralTertiary: '#e0e0e0',
    neutralSecondary: '#e5e5e5',
    neutralPrimaryAlt: '#eaeaea',
    neutralPrimary: '#d1d1d1',
    neutralDark: '#f4f4f4',
    black: '#f9f9f9',
    white: '#2b2d34',
  },
  customColorsSet: {
    searchListColor: '#373942',
    calloutBorderColor: '#3d4a54',
    layoutBorderColor: '#3d4a54',
    functionNavigationTitle: '#373942',
    functionNavigationRightContent: '#373942',
    customPoviotTitle: 'rgb(21, 43, 58)',
    customPoviotTitleSelected: 'rgb(12, 32, 47)',
    changeViewerTitle: '#373942',
  },
};
