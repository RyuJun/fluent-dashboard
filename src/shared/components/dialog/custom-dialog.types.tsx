import { IButtonProps } from '@fluentui/react';

export interface IDialogButtonProps extends IButtonProps {
  onClick?: () => void;
  text?: string;
  primary?: boolean;
}
export interface ICustomDialogContentProps {
  title?: string | JSX.Element;
  buttons?: IDialogButtonProps[];
  message?: string | JSX.Element;
  isDraggable?: boolean;
}
export interface ICustomDialogProps {
  content?: ICustomDialogContentProps;
  isOpen?: boolean;
  onDismiss?: () => void;
}
