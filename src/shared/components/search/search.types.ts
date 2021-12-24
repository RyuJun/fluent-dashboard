export interface ISearchPropsSubTabs {
  name?: string;
  name_code?: string;
  path?: string;
}
export interface ISearchHelpProps {
  title: string;
  content: string;
  pdetailPathath: string;
  subPath?: ISearchPropsSubTabs;
}

export interface ISearchProps {
  name: string;
  en_name: string;
  name_code?: string;
  position?: string;
  path?: string;
  help?: ISearchHelpProps;
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
export interface ISearchCompProps {
  setVisible: (boolean) => void;
}
