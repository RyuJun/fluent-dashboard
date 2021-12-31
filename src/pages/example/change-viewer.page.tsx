import * as yup from 'yup';

import { ColumnLayout, ColumnLayoutItem } from 'shared/components/column-layout';
import { FormProvider, useForm } from 'react-hook-form';
import { editStackStyles, editTextFieldStyles, viewStackStyles } from 'shared/variables/fluent.constants';

import { ChangeViewer } from 'shared/components/change-viewer';
import { ControlledTextField } from 'shared/hook-form';
import { FUNC_NAV_MODE } from 'shared/variables/common.constants';
import { FooterButtonGroup } from 'shared/components/footer';
import { FuncNavMode } from 'shared/types/common.types';
import { PageTitle } from 'shared/components/page-title';
import React from 'react';
import { Stack } from '@fluentui/react';
import { yupResolver } from '@hookform/resolvers/yup';

const ChangeViewerExample = (): React.ReactElement => {
  const item = { test: 0 };
  const onSubmit = () => null;
  const onCancel = () => null;
  const onReset = () => null;

  const [mode, setMode] = React.useState<FuncNavMode>(FUNC_NAV_MODE.VIEW);

  const handleChangeMode = () => {
    setMode(mode === FUNC_NAV_MODE.VIEW ? FUNC_NAV_MODE.EDIT : FUNC_NAV_MODE.VIEW);
  };

  const validationSchema = React.useMemo(() => {
    return yup.object().shape({
      test: yup.number(),
    });
  }, []);

  const methods = useForm({
    defaultValues: item,
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const { reset, control, getValues, trigger } = methods;

  return (
    <FormProvider {...methods}>
      <PageTitle status={mode} onChangeMode={handleChangeMode} onBack={handleChangeMode} />
      <ChangeViewer
        mode={mode}
        isTitle
        viewRender={
          <ColumnLayout column={2} labelWidth={300}>
            <ColumnLayoutItem label="label" value={<Stack styles={viewStackStyles}>value</Stack>} />
            <ColumnLayoutItem label="label" value={<Stack styles={viewStackStyles}>value</Stack>} />
            <ColumnLayoutItem label="label" value={<Stack styles={viewStackStyles}>value</Stack>} />
            <ColumnLayoutItem label="label" value={<Stack styles={viewStackStyles}>value</Stack>} />
            <ColumnLayoutItem label="label" value={<Stack styles={viewStackStyles}>value</Stack>} />
            <ColumnLayoutItem label="label" value={<Stack styles={viewStackStyles}>value</Stack>} />
            <ColumnLayoutItem label="label" value={<Stack styles={viewStackStyles}>value</Stack>} />
            <ColumnLayoutItem label="label" value={<Stack styles={viewStackStyles}>value</Stack>} />
          </ColumnLayout>
        }
        editRender={
          <ColumnLayout column={1} labelWidth={300}>
            <ColumnLayoutItem
              isContainer
              label="label"
              value={
                <Stack styles={editStackStyles}>
                  <ControlledTextField required={true} styles={editTextFieldStyles} control={control} name="test" />
                </Stack>
              }
            />
            <ColumnLayoutItem
              isContainer
              label="label"
              value={
                <Stack styles={editStackStyles}>
                  <ControlledTextField required={true} styles={editTextFieldStyles} control={control} name="test" />
                </Stack>
              }
            />
            <ColumnLayoutItem
              isContainer
              label="label"
              value={
                <Stack styles={editStackStyles}>
                  <ControlledTextField required={true} styles={editTextFieldStyles} control={control} name="test" />
                </Stack>
              }
            />
            <ColumnLayoutItem
              isContainer
              label="label"
              value={
                <Stack styles={editStackStyles}>
                  <ControlledTextField required={true} styles={editTextFieldStyles} control={control} name="test" />
                </Stack>
              }
            />
            <ColumnLayoutItem
              isContainer
              label="label"
              value={
                <Stack styles={editStackStyles}>
                  <ControlledTextField required={true} styles={editTextFieldStyles} control={control} name="test" />
                </Stack>
              }
            />
          </ColumnLayout>
        }
        footerRender={
          <FooterButtonGroup defaultValues={item} onSubmit={onSubmit} onCancel={onCancel} onReset={onReset} />
        }
      />
    </FormProvider>
  );
};

export default ChangeViewerExample;
