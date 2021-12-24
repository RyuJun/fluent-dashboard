import React from 'react';
import { Dialog, DialogFooter, DefaultButton, ContextualMenu } from '@fluentui/react';
import { ICustomDialogProps } from './custom-dialog.types';
const dragOptions = {
  moveMenuItemText: 'Move',
  closeMenuItemText: 'Close',
  menu: ContextualMenu,
  keepInBounds: true,
};
export const CustomDialog = ({ content, isOpen, onDismiss }: ICustomDialogProps): React.ReactElement => {
  if (content === undefined) return <></>;
  const { title, buttons, message, isDraggable = true } = content;
  const handleClose = () => {
    onDismiss();
  };
  const modalProps = {
    isBlocking: buttons === undefined || buttons.length === 0 ? true : false,
    dragOptions: isDraggable ? dragOptions : undefined,
  };

  return (
    <>
      <Dialog
        hidden={!isOpen}
        onDismiss={handleClose}
        dialogContentProps={{
          title: <span>{title}</span>,
        }}
        modalProps={modalProps}
      >
        <div>{message}</div>
        {buttons && (
          <DialogFooter>
            {buttons.map((button, i) => {
              const { onClick, ...prop } = button;
              return (
                <React.Fragment key={i}>
                  <DefaultButton
                    onClick={() => {
                      if (onClick) onClick();
                      handleClose();
                    }}
                    {...prop}
                  />
                </React.Fragment>
              );
            })}
          </DialogFooter>
        )}
      </Dialog>
    </>
  );
};
export default CustomDialog;
