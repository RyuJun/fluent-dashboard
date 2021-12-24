import * as React from 'react';
import { Controller } from 'react-hook-form';
import { ChoiceGroup, IChoiceGroupProps, Label } from '@fluentui/react';
import { HookFormProps } from './HookFormProps';
import { Tooltip } from 'shared/components/tooltip';
import { labelStyles } from 'shared/variables/fluent.constants';

export const ControlledChoiceGroup: React.FC<HookFormProps & IChoiceGroupProps> = (props) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      rules={props.rules}
      defaultValue={props.defaultValue || ''}
      render={({ field: { onChange, name: fieldName, value }, fieldState: { error } }) => {
        const { label, required, disabled, tooltip, ...prop } = props;
        return (
          <div>
            {label && (
              <Label disabled={disabled} styles={labelStyles}>
                {label}
                {tooltip && <Tooltip>{tooltip}</Tooltip>}
                {required && <span style={{ color: 'rgb(164, 38, 44)', padding: '0 2px' }}>*</span>}
              </Label>
            )}
            <ChoiceGroup
              {...prop}
              selectedKey={value}
              onChange={(_e, option) => {
                onChange(option.key);
              }}
              defaultSelectedKey={value}
              disabled={disabled}
            />

            {error && (
              <div role="alert">
                <p className="ms-TextField-errorMessage">
                  <span data-automation-id="error-message" style={{ color: 'rgb(164, 38, 44)' }}>
                    {error.message}
                  </span>
                </p>
              </div>
            )}
          </div>
        );
      }}
    />
  );
};

export default ControlledChoiceGroup;
