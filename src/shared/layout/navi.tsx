import * as React from 'react';

import {
  Callout,
  ChoiceGroup,
  ColorPicker,
  DefaultButton,
  Dropdown,
  ICalloutContentStyles,
  IChoiceGroupOption,
  IChoiceGroupStyles,
  IColor,
  IColorPickerStyles,
  IDropdownOption,
  IIconStyles,
  IPanelStyles,
  ISliderStyles,
  IStackItemStyles,
  IStackStyles,
  Label,
  Panel,
  Slider,
  Stack,
  Text,
  mergeStyleSets,
} from '@fluentui/react';
import {
  initialSetting,
  layoutChangeSelector,
  navColorChangeSelector,
  resetSelector,
  settingsState,
  sizeChangeSelector,
  themeChangeSelector,
} from 'shared/context/settings.recoil';
import { useBoolean, useId } from '@fluentui/react-hooks';
import { useRecoilValue, useSetRecoilState } from 'recoil';

// import { BookmarkSearch } from 'shared/components/bookmark-search';
import { Icon } from '@fluentui/react/lib/Icon';
// import { Search } from 'shared/components/search';
import i18next from 'i18next';
import { lightTheme } from 'utils/theme/theme';
import { useTranslation } from 'react-i18next';

const getIcon = (iconName: string) => <Icon style={stackItemIconStyles} iconName={iconName} />;

const stackStyles: IStackStyles = {
  root: {
    gap: 5,
  },
};

const stackItemStyles: IStackItemStyles = {
  root: {
    color: lightTheme.palette.white,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: 16,
  },
};

export const defaultSliderStyles: Partial<ISliderStyles> = {
  slideBox: {
    padding: 0,
  },
};

const stackItemIconStyles: Object = {
  width: 32,
  height: 32,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: 'inherit',
  fontWeight: 100,
  cursor: 'pointer',
};

const stackItemContentsStyles = mergeStyleSets({
  notification: {
    backgroundColor: lightTheme.palette.themePrimary,
    color: lightTheme.palette.white,
    position: 'absolute',
    right: -2,
    bottom: 2,
    borderRadius: 30,
    fontSize: 10,
    width: 16,
    height: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  status: {
    background: '#FFFFFF',
    fontSize: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    width: 16,
    height: 16,
    color: '#0C202F',
    marginLeft: 5,
  },
  dropDownButton: {
    fontSize: 12,
  },
  stick: {
    width: 1,
    height: 16,
    background: '#C8C6C4',
  },
  text: {
    color: lightTheme.palette.white,
    fontSize: 12,
  },
  calloutWrapper: {
    maxWidth: 320,
    width: '100%',
    boxShadow: '5px 5px 5px rgba(0,0,0,0.2)',
    padding: '22px 24px 18px 24px',
  },
  calloutInner: {
    height: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  calloutTitle: {
    fontWeight: 'bold',
    height: 32,
    display: 'flex',
    alignItems: 'center',
  },
  calloutText: {
    height: 32,
    display: 'flex',
    alignItems: 'center',
  },
  calloutDivider: {
    height: 1,
    width: '100%',
    backgroundColor: '#C8C6C4',
    margin: '15px 0',
  },
  calloutActions: {
    display: 'flex',
    alignItems: 'center',
  },
});
const footerStyles = mergeStyleSets({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    padding: '0 20px',
    borderTop: '1px solid #97979759',
  },
  buttons: {
    margin: '10px 0',
    width: 'fit-content',
  },
});

const panerStackStyles: IStackStyles = {
  root: {
    gap: 30,
    flexDirection: 'column',
  },
};

const panelStyles: Partial<IPanelStyles> = {
  overlay: { background: 'rgba(0,0,0, 0.25)' },
  main: { boxShadow: 'none' },
  commands: { margin: 0, padding: 0 },
  header: {
    height: 46,
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid #97979759',
  },
  headerText: {
    fontSize: 14,
  },
  content: { padding: '17px 20px' },
  subComponentStyles: {
    closeButton: {
      root: {
        position: 'absolute',
        top: 6,
        right: -11,
        fontSize: 12,
      },
    },
  },
};

const choiceGroupStyles: IChoiceGroupStyles = {
  flexContainer: {
    display: 'flex',
    gap: 10,
  },
};

const bookmarkIconStyles: IIconStyles = {
  root: {
    position: 'absolute',
    color: '#FFC80A',
    left: 10,
    top: 6,
    width: 32,
    height: 32,
    fontSize: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
};

const bookmarkCalloutStytles: Partial<ICalloutContentStyles> = {
  root: {},
  container: {},
  calloutMain: {
    borderRadius: 'none',
    border: '1px solid #97979797',
  },
};

const initialThemeOptions: IChoiceGroupOption[] = [
  { key: 'light', text: 'Light' },
  { key: 'dark', text: 'Dark' },
];

const initialLayoutOptions: IChoiceGroupOption[] = [
  { key: 'vertical', text: 'Vertical' },
  { key: 'horizontal', text: 'Horizontal' },
];

const LanguageOptions: IDropdownOption[] = [
  { key: 'ko', text: 'Korean' },
  { key: 'en', text: 'English' },
  { key: 'zh', text: 'Chinese' },
  { key: 'ja', text: 'Japanese' },
];

const fontOptions: IDropdownOption[] = [
  { key: 'noto', text: 'Noto Sans' },
  { key: 'nanum', text: 'Nanum Gothic' },
];
const colorPickerStyles: Partial<IColorPickerStyles> = {
  panel: { padding: 0, marginTop: 5 },
  root: {
    maxWidth: '100%',
    minWidth: '100%',
  },
  colorRectangle: { height: 200 },
  table: {
    display: 'none',
  },
};

const Navi = (): React.ReactElement => {
  const { t } = useTranslation(['common']);
  const [isSettingVisible, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);
  const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] = useBoolean(false);
  const [searchVisible, { toggle: toggleSearchVisible }] = useBoolean(false);
  const [bookmarkVisible, { toggle: toggleBookmarkVisible }] = useBoolean(false);

  const userDetailCallout: string = useId('user-detail-callout');
  const userBookmarkCallout: string = useId('user-bookmark-callout');

  const settings = useRecoilValue(settingsState);
  const setTheme = useSetRecoilState(themeChangeSelector);
  const setLayout = useSetRecoilState(layoutChangeSelector);
  const setSize = useSetRecoilState(sizeChangeSelector);
  const setNavColor = useSetRecoilState(navColorChangeSelector);
  const setReset = useSetRecoilState(resetSelector);

  const _onThemeChange = (ev: React.FormEvent<HTMLInputElement>, option: IChoiceGroupOption): void => {
    setTheme(option.key);
  };

  const _onMenuLayoutChange = (ev: React.FormEvent<HTMLInputElement>, option: IChoiceGroupOption): void => {
    setLayout(option.key);
  };
  const _onSizeChange = (value): void => {
    if (settings.size !== value) setSize(value);
  };

  const _onNavColorChange = (ev: React.FormEvent<HTMLInputElement>, colorObj: IColor): void => {
    setNavColor(colorObj.str);
  };

  const _onLanguageChange = (ev: React.FormEvent<HTMLInputElement>, option: IDropdownOption): void => {
    //TODO: @typescript-eslint/no-floating-promises 확인 필요
    i18next.changeLanguage(option.key as string).catch(() => {
      console.log('changeLanguage error');
    });
  };
  const _onReset = (): void => {
    setReset(initialSetting);
  };

  return (
    <nav style={{ backgroundColor: String(settings.navColor) }}>
      {/* {searchVisible && <Search setVisible={toggleSearchVisible} />} */}
      <Icon
        iconName="FavoriteStar"
        id={userBookmarkCallout}
        styles={bookmarkIconStyles}
        onClick={toggleBookmarkVisible}
        style={{
          left: settings.layout === 'horizontal' ? 100 : 10,
        }}
      />
      {settings.layout === 'horizontal' && <div className="logo-wrapper">PAS-K</div>}
      <Stack horizontal disableShrink styles={stackStyles}>
        <Stack.Item styles={stackItemStyles}>
          <Text className={stackItemContentsStyles.text}>Status:</Text>
          <div className={stackItemContentsStyles.status}>M</div>
        </Stack.Item>
        <Stack.Item styles={stackItemStyles}>
          {getIcon('Timer')}
          <Text className={stackItemContentsStyles.text}>00:09:59</Text>
        </Stack.Item>
        <Stack.Item styles={stackItemStyles} onClick={toggleSearchVisible}>
          {getIcon('Search')}
        </Stack.Item>
        <Stack.Item styles={stackItemStyles}>
          {getIcon('Ringer')}
          <Text className={stackItemContentsStyles.notification}>+9</Text>
        </Stack.Item>
        <Stack.Item styles={stackItemStyles}>
          {getIcon('UserOptional')}
          <div className={stackItemContentsStyles.stick} />
          <div
            id={userDetailCallout}
            className={stackItemContentsStyles.dropDownButton}
            onClick={toggleIsCalloutVisible}
          >
            {isCalloutVisible ? getIcon('ChevronUp') : getIcon('ChevronDown')}
          </div>
          {isCalloutVisible && (
            <Callout
              className={stackItemContentsStyles.calloutWrapper}
              target={`#${userDetailCallout}`}
              onDismiss={toggleIsCalloutVisible}
              setInitialFocus
            >
              <Stack styles={stackStyles} className="user-info-wrapper">
                <Stack.Item className={stackItemContentsStyles.calloutInner} styles={stackItemStyles}>
                  <Text className={stackItemContentsStyles.calloutTitle}>User</Text>
                  <Text className={stackItemContentsStyles.calloutText}>admin ID</Text>
                  <Text className={stackItemContentsStyles.calloutText}>IP(110,10,12,122)</Text>
                  <Text className={stackItemContentsStyles.calloutText}>플렛폼 명 / 모델명</Text>
                  <div className={stackItemContentsStyles.calloutDivider} />
                  <Text className={`icon-with-text ${stackItemContentsStyles.calloutActions}`}>
                    {getIcon('Settings')} 시스템 설정
                  </Text>
                  <Text className={`icon-with-text ${stackItemContentsStyles.calloutActions}`}>
                    {getIcon('Signout')} 로그아웃
                  </Text>
                </Stack.Item>
              </Stack>
            </Callout>
          )}
        </Stack.Item>
        <Stack.Item styles={stackItemStyles} onClick={openPanel}>
          {getIcon('Settings')}
        </Stack.Item>
      </Stack>
      <Panel
        headerText={t('setting')}
        isOpen={isSettingVisible}
        onDismiss={dismissPanel}
        closeButtonAriaLabel="Close"
        styles={panelStyles}
        isLightDismiss
      >
        <Stack horizontal disableShrink styles={panerStackStyles}>
          <Stack.Item>
            <ChoiceGroup
              selectedKey={settings.theme}
              options={initialThemeOptions}
              styles={choiceGroupStyles}
              onChange={_onThemeChange}
              label="Skin"
            />
          </Stack.Item>
          <Stack.Item>
            <ChoiceGroup
              selectedKey={String(settings.layout)}
              options={initialLayoutOptions}
              styles={choiceGroupStyles}
              onChange={_onMenuLayoutChange}
              label="Menu Layout"
            />
          </Stack.Item>
          <Stack.Item>
            <Dropdown
              placeholder="Select an option"
              selectedKey={i18next.language}
              label="Language"
              options={LanguageOptions}
              onChange={_onLanguageChange}
            />
          </Stack.Item>
          <Stack.Item>
            <Dropdown placeholder="Select an option" selectedKey={settings.font} label="Font" options={fontOptions} />
          </Stack.Item>
          <Stack.Item>
            <Slider
              label="Page Size"
              min={80}
              max={120}
              step={10}
              value={settings.size}
              styles={defaultSliderStyles}
              showValue={false}
              onChange={_onSizeChange}
            />
          </Stack.Item>
          <Stack.Item>
            <Label>Navbar Color</Label>
            <ColorPicker color={settings.navColor} onChange={_onNavColorChange} styles={colorPickerStyles} />
          </Stack.Item>
        </Stack>
        <Stack className={footerStyles.wrapper}>
          <DefaultButton className={footerStyles.buttons} text="초기화" onClick={_onReset} />
        </Stack>
      </Panel>
    </nav>
  );
};

export default React.memo(Navi);
