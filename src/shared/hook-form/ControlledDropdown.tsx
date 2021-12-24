import { Dropdown, IDropdownProps, Label } from '@fluentui/react';
import * as React from 'react';
import { Controller } from 'react-hook-form';
import { Tooltip } from 'shared/components/tooltip';
import { labelStyles } from 'shared/variables/fluent.constants';
import { HookFormProps } from './HookFormProps';

interface ICustomDropdownProps extends IDropdownProps {
  textValidateFunc?: (unit: string | number) => void;
  conditionFunc?: (value) => void;
}

export const ControlledDropdown: React.FC<HookFormProps & ICustomDropdownProps> = (props) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      rules={props.rules}
      defaultValue={props.defaultValue || ''}
      render={({ field: { onChange, name: fieldName, value }, fieldState: { error } }) => {
        const { label, required, disabled, tooltip, textValidateFunc, multiSelect, conditionFunc, ...prop } = props;

        const [selectedKeys, setSelectedKeys] = React.useState([]);
        React.useEffect(() => {
          setSelectedKeys(value);
        }, [value]);

        return (
          <>
            {label && (
              <Label disabled={disabled} styles={labelStyles}>
                {label}
                {tooltip && <Tooltip>{tooltip}</Tooltip>}
                {required && <span style={{ color: 'rgb(164, 38, 44)', padding: '0 2px' }}>*</span>}
              </Label>
            )}
            {multiSelect ? (
              <Dropdown
                {...prop}
                selectedKeys={selectedKeys}
                multiSelect
                onChange={(event, item) => {
                  const selKeys = item.selected
                    ? [...selectedKeys, item.key]
                    : selectedKeys.filter((key) => key !== item.key);
                  setSelectedKeys(selKeys);
                  onChange(selKeys);
                }}
                errorMessage={error && error.message}
                disabled={disabled}
                defaultSelectedKeys={undefined}
              />
            ) : (
              <Dropdown
                {...prop}
                selectedKey={value}
                onChange={(_e, option) => {
                  onChange(option.key);
                  textValidateFunc && textValidateFunc(option.key);
                  conditionFunc && option.key !== value && conditionFunc(option.key);
                }}
                /* onChanged={(option) => {
                  onChange(option.key)
                }} */
                errorMessage={error && error.message}
                defaultValue={undefined}
                disabled={disabled}
              />
            )}
          </>
        );
      }}
    />
  );
};

export default ControlledDropdown;
