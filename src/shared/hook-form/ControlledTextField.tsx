import * as React from 'react';
import { Label, ITextFieldProps, TextField, Stack } from '@fluentui/react';
import { Controller } from 'react-hook-form';
import { HookFormProps } from './HookFormProps';
import { Tooltip } from 'shared/components/tooltip';
import { labelStyles } from 'shared/variables/fluent.constants';

interface ICustomTextfieldProps extends ITextFieldProps {
  conditionFunc?: (value) => void;
}

export const ControlledTextField: React.FC<HookFormProps & ICustomTextfieldProps> = (props) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      rules={props.rules}
      defaultValue={props.defaultValue ?? ''}
      render={({ field: { onChange, name: fieldName, value }, fieldState: { error } }) => {
        const { label, required, disabled, tooltip, styles, conditionFunc, ...prop } = props;
        return (
          <Stack styles={styles}>
            {label && (
              <Label disabled={disabled} styles={labelStyles}>
                {label}
                {tooltip && <Tooltip>{tooltip}</Tooltip>}
                {required && <span style={{ color: 'rgb(164, 38, 44)', padding: '0 2px' }}>*</span>}
              </Label>
            )}
            <TextField
              {...prop}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                onChange(e);
                conditionFunc && e.target.value !== value && conditionFunc(e.target.value);
              }}
              onKeyPress={(e) => {
                props.onKeyPress && props.onKeyPress(e);
              }}
              value={value ?? ''}
              name={fieldName}
              errorMessage={error && error.message}
              defaultValue={undefined}
              disabled={disabled}
            />
          </Stack>
        );
      }}
    />
  );
};
