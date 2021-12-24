import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { ContextualMenu } from '@fluentui/react/lib/ContextualMenu';
import { Dialog, DialogFooter, DialogType } from '@fluentui/react/lib/Dialog';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

interface DialogContentProps {
  type: DialogType;
  title: string;
  subText: string;
}

const dragOptions = {
  moveMenuItemText: 'Move',
  closeMenuItemText: 'Close',
  menu: ContextualMenu,
};

interface IConfirmDialog {
  dialogContentProps: DialogContentProps;
  isOpen: boolean;
  onConfirm: () => void;
  onDismiss: () => void;
  isDraggable?: boolean;
  maxWidth?: number;
  children?: React.ReactNode;
}

export const ConfirmDialog = ({
  dialogContentProps,
  isDraggable = true,
  isOpen,
  maxWidth,
  onDismiss,
  onConfirm,
  children,
}: IConfirmDialog): React.ReactElement => {
  const { t } = useTranslation();

  const modalProps = React.useMemo(
    () => ({
      isBlocking: true,
      styles: { main: { maxWidth: maxWidth || 450 } },
      dragOptions: isDraggable ? dragOptions : undefined,
    }),
    [isDraggable]
  );

  return (
    <Dialog hidden={!isOpen} onDismiss={onDismiss} dialogContentProps={dialogContentProps} modalProps={modalProps}>
      {children}
      <DialogFooter>
        <PrimaryButton onClick={onConfirm} text={t('common:confirm')} />
        <DefaultButton onClick={onDismiss} text={t('common:cancel')} />
      </DialogFooter>
    </Dialog>
  );
};
