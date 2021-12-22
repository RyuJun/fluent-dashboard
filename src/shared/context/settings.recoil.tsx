import { atom, selector } from 'recoil';

export interface ISettings {
  theme: 'light' | 'dark';
  layout: string;
  font: string;
  size: number;
  navColor: string;
  device: string;
  'login-timeout': number;
}

export const initialSetting: ISettings = {
  theme: 'light',
  layout: 'vertical',
  font: 'noto',
  size: 100,
  navColor: '#0C202F',
  device: '',
  'login-timeout': 60,
};

const initialStorageSetting = (): ISettings => {
  const storage: ISettings = JSON.parse(localStorage.getItem('settings'));
  if (!storage) {
    localStorage.setItem('settings', JSON.stringify(initialSetting));
    return initialSetting;
  }
  return storage;
};

export const settingsState = atom({
  key: 'settings/settingsState',
  default: initialStorageSetting(),
});

export const themeChangeSelector = selector({
  key: 'settings/themeChangeSelector',
  get: ({ get }) => get(settingsState),
  set: ({ set }, newVal) => {
    set(settingsState, (prevSetting: ISettings) => {
      const newStorage = { ...prevSetting, theme: newVal };
      localStorage.setItem('settings', JSON.stringify(newStorage));
      return newStorage;
    });
  },
});

export const layoutChangeSelector = selector({
  key: 'settings/layoutChangeSelector',
  get: ({ get }) => get(settingsState),
  set: ({ set }, newVal) => {
    set(settingsState, (prevSetting: ISettings) => {
      const newStorage = { ...prevSetting, layout: newVal };
      localStorage.setItem('settings', JSON.stringify(newStorage));
      return newStorage;
    });
  },
});
export const sizeChangeSelector = selector({
  key: 'settings/sizeChangeSelector',
  get: ({ get }) => get(settingsState),
  set: ({ set }, newVal) => {
    set(settingsState, (prevSetting: ISettings) => {
      const newStorage = { ...prevSetting, size: newVal };
      localStorage.setItem('settings', JSON.stringify(newStorage));
      return newStorage;
    });
  },
});
export const navColorChangeSelector = selector({
  key: 'settings/navColorChangeSelector',
  get: ({ get }) => get(settingsState),
  set: ({ set }, newVal) => {
    set(settingsState, (prevSetting: ISettings) => {
      const newStorage = { ...prevSetting, navColor: newVal };
      localStorage.setItem('settings', JSON.stringify(newStorage));
      return newStorage;
    });
  },
});

export const deviceChangeSelector = selector({
  key: 'settings/deviceChangeSelector',
  get: ({ get }) => get(settingsState),
  set: ({ set }, newVal) => {
    set(settingsState, (prevSetting: ISettings) => {
      const newStorage = { ...prevSetting, device: newVal };
      localStorage.setItem('settings', JSON.stringify(newStorage));
      return newStorage;
    });
  },
});

export const loginTimeoutChangeSelector = selector({
  key: 'settings/loginTimeoutChangeSelector',
  get: ({ get }) => get(settingsState),
  set: ({ set }, newVal) => {
    set(settingsState, (prevSetting: ISettings) => {
      const newStorage = { ...prevSetting, 'login-timeout': newVal };
      localStorage.setItem('settings', JSON.stringify(newStorage));
      return newStorage;
    });
  },
});

export const resetSelector = selector({
  key: 'settings/resetSelector',
  get: ({ get }) => get(settingsState),
  set: ({ set }, newVal) => {
    set(settingsState, () => {
      const newStorage = newVal;
      localStorage.setItem('settings', JSON.stringify(newStorage));
      return newStorage;
    });
  },
});
