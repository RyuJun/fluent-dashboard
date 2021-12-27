/**
 * interface
 */

export interface IPageSizeOption {
  min: number;
  max: number;
  step: number;
}

export interface IBindingProps<T> {
  isBinding?: boolean;
  bindedItems?: Array<string | number> | string | number | null;
  onChangeBinding?: (items: T[]) => void;
}
export interface IBindingCtypeProps {
  isBinding?: boolean;
}
export interface IEditProps<T> {
  controlMode: ControlMode;
  funcNavMode: FuncNavMode;
  isBinding?: boolean;
  item: T;
  onDismiss: () => void;
  onModeChange?: () => void;
  setItem?: (values) => void;
  [x: string]: unknown;
}
export interface IInfoProps<T> {
  column?: number;
  item: T;
  onDismiss?: () => void;
  [x: string]: unknown;
}
export interface ISettingProps<T> {
  item: T;
  onDismiss: () => void;
  onAddSetting?: (item: T) => void;
  onEditSetting?: (item: T) => void;
}
//FIXME: yang 에 정의된 타입들을 별도 파일로 분리할 필요가 있는지 검토 필요.
//FIXME: ex) [common.type.ts, common.interface.ts] or [common.types.ts, yang.types.ts]
export interface IStatisticsL4 {
  conns: number;
  conns_active: number;
  conns_inactive: number;
  cps: number;
  inpkts: number;
  inpps: number;
  inbps: number;
  outpkts: number;
  outpps: number;
  outbps: number;
}

export interface IStatisticsL7 {
  rps_repr: number;
  rps: number;
  request: number;
  conns: number;
  conns_active: number;
  conns_inactive: number;
  cps: number;
  inpkts: number;
  inpps: number;
  inbps: number;
  inbytes: number;
  outpkts: number;
  outpps: number;
  outbps: number;
  outbytes: number;
  currpool: number;
}
export declare enum t_status {
  enable = 'enable',
  disable = 'disable',
}
/**
 * type
 */
export type Nullable<T> = T | null;
export type Status = 'enable' | 'disable';
export type HealthCheckResult = 'act' | 'inact' | 'backup' | 'full';
export type ControlMode = 'view' | 'add' | 'edit' | 'copy' | 'delete' | 'check' | 'patch';
export type FuncNavMode = 'edit' | 'view';

/**
 * unit
 */
export type SecMin = 'sec' | 'min';
export type SecMinHour = 'sec' | 'min' | 'hour';
