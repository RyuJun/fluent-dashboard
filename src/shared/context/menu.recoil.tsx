import { atom } from 'recoil';

export interface ITabs {
  name_code: string;
  path: string;
}

export interface IinitialMenu {
  name_code?: string;
  icon?: string;
  active: boolean;
  path?: string;
  help_path?: string;
  views?: IinitialMenu[];
  tabs?: ITabs[];
}

const initialMenu: IinitialMenu[] = [
  {
    name_code: 'example.skeleton',
    icon: 'ViewDashboard',
    active: false,
    path: '/example/skeleton',
    help_path: '/example/skeleton',
  },
];

export const menuState = atom({
  key: 'menu/menuState',
  default: initialMenu,
});
