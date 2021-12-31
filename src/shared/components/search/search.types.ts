import { ITabs } from 'shared/context/menu.recoil';
export interface ISearchMoveConfig {
  step: number;
  status: 'page' | 'help' | null;
}
export interface IHelpCalloutContent {
  title: string;
  content: string;
  path?: string;
  selectTarget?: {
    name: string;
    en_name: string;
    name_code: string;
    path: string;
  };
  setCalloutVisible?: (visible) => void;
  clearSearch?: () => void;
}
export interface ISearchHelpDataProps {
  name: string;
  help_path?: string;
}

export interface ISearchHelpPageProps {
  name: string;
  name_code: string;
  position?: string[];
  path: string;
  help_path?: string;
  tabs?: ITabs[];
}
export interface ISearchCompProps {
  setVisible: (boolean) => void;
}
