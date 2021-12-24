import React from 'react';
import { Controller } from 'react-hook-form';
import { IToggleProps, Toggle, Label, Stack, IStackProps } from '@fluentui/react';
import { HookFormProps } from './HookFormProps';
import { Tooltip } from 'shared/components/tooltip';
import { labelStyles } from 'shared/variables/fluent.constants';

export interface CustomIToggleProps extends IToggleProps {
  value?: string;
  mode?: 'view' | 'edit';
  conditionFunc?: (value) => void;
}

const ControlledStatusToggle = (props: HookFormProps & CustomIToggleProps): React.ReactElement => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      rules={props.rules}
      render={({ field: { onChange, name, value } }) => {
        const defaultCehcekd = value === 'enable' ? true : false;
        const { label, mode, tooltip, conditionFunc, ...prop } = props;
        const distabled = prop.disabled || mode === 'view' || false;
        return (
          <>
            <Stack horizontal styles={props.styles}>
              {label && (
                <Label disabled={distabled} styles={labelStyles}>
                  {label}
                  {tooltip && <Tooltip>{tooltip}</Tooltip>}
                </Label>
              )}
              <Toggle
                {...prop}
                disabled={distabled}
                checked={defaultCehcekd}
                onChange={(e: React.MouseEvent<HTMLElement>, checked?: boolean) => {
                  const s = { target: { name, value } };
                  s.target.name = name;
                  s.target.value = checked ? 'enable' : 'disable';
                  onChange(s);
                  conditionFunc && s.target.value !== value && conditionFunc(s.target.value);
                }}
                styles={{
                  root: {
                    marginBottom: 0,
                    display: 'flex',
                    alignItems: 'middle',
                  },
                }}
              />
            </Stack>
          </>
        );
      }}
    />
  );
};
export default ControlledStatusToggle;
