import { IChoiceGroupOption, IDropdownOption } from '@fluentui/react';

import { TFunction } from 'i18next';
import { IPageSizeOption } from 'shared/types/common.types';

export const PATH = {
  root: '/',
  images: process.env.NODE_ENV === 'production' ? '/assets/images' : '/src/assets/images',
  rootDashboard: '/dashboard/dashboard',
};

export const DEFAULT_COLOR = {
  line: '#97979759',
};

export const DEFAULT_SETTING_CONFIG = {
  pageSize: <IPageSizeOption>{
    min: 80,
    max: 120,
    step: 10,
  },
  initialThemeOptions: <IChoiceGroupOption[]>[
    { key: 'light', text: 'Light' },
    { key: 'dark', text: 'Dark' },
  ],
  initialLayoutOptions: <IChoiceGroupOption[]>[
    { key: 'vertical', text: 'Vertical' },
    { key: 'horizontal', text: 'Horizontal' },
  ],
  LanguageOptions: <IDropdownOption[]>[
    { key: 'ko', text: 'Korean' },
    { key: 'en', text: 'English' },
    { key: 'zh', text: 'Chinese' },
    { key: 'ja', text: 'Japanese' },
  ],
  fontOptions: <IDropdownOption[]>[
    { key: 'noto', text: 'Noto Sans' },
    { key: 'nanum', text: 'Nanum Gothic' },
  ],
};

export const RESPONSIVE = {
  WINDOW_SIZE_XSM: 640,
  WINDOW_SIZE_SM: 768,
  WINDOW_SIZE_MD: 1024,
  WINDOW_SIZE_LG: 1280,
};

export const TOAST = {
  delay: 4000,
};

export const FUNC_NAV_MODE = {
  EDIT: 'edit',
  VIEW: 'view',
} as const;

export const CONTROL_MODE = {
  VIEW: 'view',
  ADD: 'add',
  EDIT: 'edit',
  DELETE: 'delete',
  COPY: 'copy',
  CHECK: 'check',
  PATCH: 'patch',
} as const;

export const COMMUNICATION_SPEED_UNIT = [
  { key: 'Mbps', text: 'Mbps' },
  { key: 'Kbps', text: 'Kbps' },
  { key: 'bps', text: 'bps' },
];

export const LINK_UNIT = [
  { key: 'up', text: 'Up' },
  { key: 'down', text: 'Down' },
];

export const SWITCH_UNIT = [
  { key: 'on', text: 'On' },
  { key: 'off', text: 'Off' },
];

export const DUPLEX_UNIT = [
  { key: 'half', text: 'Half' },
  { key: 'full', text: 'Full' },
];

export const MDI_MDIX_UNIT = [
  { key: 'auto', text: 'Auto' },
  { key: 'mdi', text: 'MDI' },
  { key: 'mdiX', text: 'MDIX' },
];

export const SFP_MODE_UNIT = [
  { key: 'copper', text: 'copper' },
  { key: 'dac', text: 'dac' },
  { key: 'normal', text: 'normal' },
];

export const SFP_SPEED_UNIT = [
  { key: '1000', text: '1' },
  { key: '10000', text: '10' },
];

export const CABLE_MODE_UNIT = [
  { key: 'copper', text: 'Copper' },
  { key: 'fiber', text: 'Fiber' },
];

export const DIRECTION_UNIT = [
  { key: 'in', text: 'in' },
  { key: 'out', text: 'out' },
  { key: 'both', text: 'both' },
];

export const IN_EXCLUDE_UNIT = [
  { key: 'include', text: 'include' },
  { key: 'exclude', text: 'exclude' },
];

export const LOAD_BALANCE_UNIT = [
  { key: 'dst-ip', text: 'dst-ip' },
  { key: 'dst-mac', text: 'dst-mac' },
  { key: 'src-dst-ip', text: 'src-dst-ip' },
  { key: 'src-dst-mac', text: 'src-dst-mac' },
  { key: 'src-ip', text: 'src-ip' },
  { key: 'src-mac', text: 'src-mac' },
  { key: 'ip-port', text: 'ip-port' },
];

export const MODE_UNIT = [
  { key: 'active', text: 'active' },
  { key: 'passive', text: 'passive' },
];

export const STATUS_UNIT = [
  { key: 'enable', text: 'enable' },
  { key: 'disable', text: 'disable' },
];

export const SEC_MIN_UNIT = (t: TFunction): IDropdownOption[] => [
  { key: 'sec', text: t('common:unit-symbol:second') },
  { key: 'min', text: t('common:unit-symbol:minute') },
];

export const SEC_MIN_HOUR_UNIT = (t: TFunction): IDropdownOption[] => [
  { key: 'sec', text: t('common:unit-symbol:second') },
  { key: 'min', text: t('common:unit-symbol:minute') },
  { key: 'hour', text: t('common:unit-symbol:hour') },
];

export const SNI_MATCH_UNIT = [
  { key: 'any', text: 'any' },
  { key: 'prefix', text: 'prefix' },
  { key: 'regex', text: 'regex' },
  { key: 'suffix', text: 'suffix' },
  { key: 'exact', text: 'exact' },
];
