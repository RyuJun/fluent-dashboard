import { CustomDialog, ICustomDialogContentProps } from 'shared/components/dialog';
import { DefaultButton, Stack } from '@fluentui/react';

import React from 'react';
import { footerStackProps } from 'shared/variables/fluent.constants';
import { isEqual } from 'lodash';
import { useBoolean } from '@fluentui/react-hooks';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface SubmitDialogButtonProps<T> {
  defaultValues: T;
  onSubmit: (item: T) => void;
  onCancel: () => void;
  onReset: () => void;
}

export function FooterButtonGroup<T>({
  defaultValues,
  onSubmit,
  onCancel,
  onReset,
}: SubmitDialogButtonProps<T>): React.ReactElement {
  const { t } = useTranslation();
  const { handleSubmit } = useFormContext();

  const [dialogIsOpen, { toggle: setDialogIsOpen }] = useBoolean(false);
  const [dialogContent, setDialogContent] = React.useState<ICustomDialogContentProps>(undefined);

  /**
   confirm : register에 등록되지 않은 내용은 설정하지 않은 데이터이고, submitData에 포함되어있지 않으므로 두 데이터에 모두 key가 존재하는 데이터만 비교한다.
    */
  const submitConfirm = (submitData) => {
    if (isEqual(submitData, defaultValues)) {
      setDialogContent({
        title: t('common:submitTitle'),
        message: t('common:submitEqualMessage'),
        buttons: [
          {
            text: t('common:confirm'),
            primary: true,
            onClick: () => onSubmit(submitData),
          },
          {
            text: t('common:cancel'),
          },
        ],
      });
      setDialogIsOpen();
      return;
    }

    onSubmit(submitData);
  };

  return (
    <Stack {...footerStackProps}>
      <DefaultButton onClick={handleSubmit((data) => submitConfirm(data))} text={t('common:apply')} />
      <DefaultButton onClick={onCancel} text={t('common:cancel')} />
      <DefaultButton onClick={onReset} text={t('common:reset')} />
      <CustomDialog content={dialogContent} isOpen={dialogIsOpen} onDismiss={() => setDialogIsOpen()} />
    </Stack>
  );
}
