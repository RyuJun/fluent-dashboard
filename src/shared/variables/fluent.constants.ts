import {
  IBreadcrumbStyles,
  IButtonStyles,
  ICalloutContentStyles,
  IComboBoxStyles,
  IDropdownStyles,
  IFontStyles,
  ILabelStyles,
  IPivotStyles,
  IStackProps,
  IStackStyles,
  ITextFieldStyles,
  IToggleStyles,
  mergeStyleSets,
} from '@fluentui/react';

/**
 * Default style variables -------------------------------
 */

export const defaultActiveColor = 'rgb(82, 153, 243) !important';
export const defaultFontStyle = { fontFamily: '"Noto Sans", "Noto Sans KR"', color: '#201F1E' };
export const defaultFontStyleSmall = { ...defaultFontStyle, fontSize: 10 };
export const defaultFontStyleSmallPlus = { ...defaultFontStyle, fontSize: 11 };
export const defaultFontStyleMedium = { ...defaultFontStyle, fontSize: 12 };
export const defaultFontStyleLarge = { ...defaultFontStyle, fontSize: 14 };

export const defaultButtonStyles: Partial<IButtonStyles> = {
  root: {
    height: 28,
    '&:disabled': {
      opacity: 0.8,
    },
  },
};

export const defaultPivotStyles: Partial<IPivotStyles> = {
  root: {
    marginBottom: 10,
    paddingLeft: 30,
    height: 40,
  },
  link: {
    padding: '0 15px',
    background: 'transparent',
    marginRight: 0,
    '&:before': {
      width: '100%',
      left: 0,
    },
  },
  linkIsSelected: {
    color: defaultActiveColor,
  },
  linkContent: {},
  text: { fontSize: defaultFontStyleLarge.fontSize },
  count: {},
  icon: {},
  linkInMenu: {},
  overflowMenuButton: {},
  itemContainer: {},
};

export const defaultBreadcrumbStyles: Partial<IBreadcrumbStyles> = {
  root: {
    margin: 0,
    paddingLeft: 25,
  },
  list: {
    height: 28,
  },
  listItem: {
    '& > i': {
      padding: '0 5px',
      fontSize: defaultFontStyleSmall.fontSize,
    },
  },
  item: {},
  chevron: {},
  overflow: {},
  overflowButton: {},
  itemLink: {
    lineHeight: 0,
    height: '100%',
    padding: '0 5px',
    fontSize: defaultFontStyleSmall.fontSize,
  },
};

/**
 * Default style variables -------------------------------
 */
export const fontStyles: Partial<IFontStyles> = {
  medium: {
    lineHeight: 20,
    textAlign: 'left',
  },
};

export const labelStyles: Partial<ILabelStyles> = {
  root: {
    ...fontStyles.medium,
    fontWeight: 'bold',
  },
};

export const editTextFieldStyles: Partial<ITextFieldStyles> = {
  root: {
    maxWidth: 300,
    width: '100%',
  },
};

export const editComboBoxStyles: Partial<IComboBoxStyles> = {
  root: {
    maxWidth: 300,
    width: '100%',
  },
  optionsContainerWrapper: {
    maxHeight: 150,
  },
};

export const editStatusToggleStyles: Partial<IToggleStyles> = {
  root: {
    maxWidth: 300,
    width: '100%',
  },
};

export const editTextFieldWithUnitProps: Partial<IStackProps> = {
  styles: {
    root: {
      maxWidth: 300,
      width: '100%',
    },
  },
  verticalAlign: 'start',
  horizontal: true,
  tokens: { childrenGap: 5 },
};

export const editUnitDropdownStyles: Partial<IDropdownStyles> = {
  title: { height: 30, lineHeight: 28 },
};

export const editDropdownStyles: Partial<IDropdownStyles> = {
  root: {
    maxWidth: 300,
    width: '100%',
  },
  dropdownItemsWrapper: {
    // maxHeight: 150,
  },
  title: {
    whiteSpace: 'normal',
  },
};

export const editWrapperStackStyles: Partial<IStackStyles> = {
  root: {
    padding: 20,
  },
};

export const viewStackStyles: Partial<IStackStyles> = {
  root: {
    padding: '0 20px',
    width: '100%',
  },
};

export const editStackStyles: Partial<IStackStyles> = {
  root: {
    padding: '6px 20px',
    width: '100%',
  },
};

export const editTextFieldWithIconStyles: Partial<IStackStyles> = {
  root: {
    maxWidth: 300,
    width: '100%',
  },
};

export const editRequestComboboxStyles: Partial<IStackStyles> = {
  root: {
    maxWidth: 300,
    width: '100%',
    button: {
      top: '2px',
    },
  },
};

export const detailTextFieldWithIconStyles: Partial<IStackStyles> = {
  root: {
    maxWidth: 300,
    width: '100%',
    marginTop: 20,
    marginLeft: 10,
    marginBottom: 10,
  },
};

export const tooltipLabelStyles: Partial<ILabelStyles> = {
  root: {
    padding: 0,
  },
};

export const footerStackProps: Partial<IStackProps> = {
  styles: {
    root: {
      padding: '10px 0',
    },
  },
  horizontal: true,
  tokens: { childrenGap: 5 },
};

export const contentSettingStackProps: Partial<IStackProps> = {
  styles: {
    root: { height: '100%', overflow: 'auto' },
  },
  className: 'custom-scrollbar',
};

export const footerSettingStackProps: Partial<IStackProps> = {
  styles: {
    root: {
      position: 'absolute',
      height: '52px',
      bottom: 0,
      padding: '10px 0',
      alignItems: 'center',
    },
  },
  horizontal: true,
  tokens: { childrenGap: 5 },
};

export const changeViewerEditStackStyles: Partial<IStackStyles> = {
  root: {
    padding: 10,
    paddingBottom: 0,
    width: '100%',
  },
};

export const editContainerStyles: Partial<IStackStyles> = {
  root: {
    maxWidth: 300,
    width: '100%',
    paddingBottom: 10,
  },
};

export const editContainerInnerStyles: Partial<ITextFieldStyles> = {
  root: {
    width: '100%',
    paddingBottom: 10,
  },
};

export const bindingAddButton = mergeStyleSets({
  wrapper: {
    border: '0',
    color: 'dodgerblue',
    cursor: 'pointer',
    fontWeight: 'normal',
    display: 'flex',
    height: 40,
    alignItems: 'center',
    width: 'fit-content',
    paddingLeft: '20px',
  },
  wrapperPadding: {
    border: '0',
    color: 'dodgerblue',
    cursor: 'pointer',
    fontWeight: 'normal',
    display: 'flex',
    height: 40,
    paddingLeft: 20,
    alignItems: 'center',
  },
  inner: {
    position: 'relative',
    top: '-2px',
    left: '5px',
  },
});

export const assignmentIconStyles: Partial<IStackStyles> = {
  root: {
    fontSize: '14px',
    fontWeight: 'normal',
    lineHeight: '20px',
    color: '#5299f3',
    cursor: 'pointer',
    flexDirection: 'row',
  },
};

export const mirroringStackStyles: Partial<IStackStyles> = {
  root: {
    padding: '6px 20px',
    width: '100%',
    alignItems: 'center',
  },
};

export const viewGridStackStyles: Partial<IStackStyles> = {
  root: {
    ...(viewStackStyles.root.valueOf() as object),
    padding: '0px',
  },
};

export const editGridStackStyles: Partial<IStackStyles> = {
  root: {
    ...(editStackStyles.root.valueOf() as object),
    padding: '0px',
  },
};

export const calloutStyles: Partial<ICalloutContentStyles> = {
  calloutMain: {
    background: 'red',
  },
};

export const bTypeTitleStyles = mergeStyleSets({
  title: {
    position: 'relative',
    fontWeight: 600,
    fontSize: 14,
    marginBottom: 10,
    paddingLeft: 20,
    span: {
      position: 'absolute',
      content: ' ',
      background: 'black',
      width: 9,
      height: 9,
      left: 0,
      top: 'calc(50% - 4.5px)',
    },
  },
});

export const bTypeTitleWithIconStyles = mergeStyleSets({
  title: {
    position: 'relative',
    fontWeight: 600,
    fontSize: 14,
    marginBottom: 10,
    paddingLeft: 20,
    display: 'flex',
    gap: '10px',
    '& > span': {
      position: 'absolute',
      content: ' ',
      background: 'black',
      width: 9,
      height: 9,
      left: 0,
      top: 'calc(50% - 4.5px)',
    },
    '& > .mode-change': {
      display: 'flex',
      padding: '0 6px',
      gap: '4px',
      background: '#5299f3',
      borderRadius: '5px',
      fontSize: '12px',
      color: 'white',
      alignItems: 'center',
      fontWeight: 'normal',
      cursor: 'pointer',
      height: '18px',
    },
  },
});
