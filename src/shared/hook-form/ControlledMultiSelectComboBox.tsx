import { ComboBox, IComboBoxProps, Label } from '@fluentui/react';
import { uniqBy } from 'lodash';
import * as React from 'react';
import { Controller, FieldErrors } from 'react-hook-form';
import { Tooltip } from 'shared/components/tooltip';
import { labelStyles } from 'shared/variables/fluent.constants';
import { HookFormProps } from './HookFormProps';

const ControlledMultiSelectComboBox: React.FC<HookFormProps & IComboBoxProps> = (props) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field: { onChange, value }, fieldState: { invalid, error } }) => {
        const { label, required, disabled, tooltip, options, defaultSelectedKey, ...others } = props;

        const [multiOptions, setMultiOptions] = React.useState([]);
        const [selectedKeys, setSelectedKeys] = React.useState([]);

        let errorMessage = null;

        if (invalid) {
          const errors = error as FieldErrors;
          errorMessage = Array.isArray(errors) ? errors[errors.length - 1].message : errors.message;
        }

        React.useEffect(() => {
          setSelectedKeys(value);

          setMultiOptions(
            uniqBy(
              [
                ...options,
                ...value.map((v: string) => {
                  return { key: `${v}`, text: `${v}` };
                }),
              ],
              'key'
            )
          );
        }, [defaultSelectedKey]);

        return (
          <>
            {label && (
              <Label disabled={disabled} styles={labelStyles}>
                {label}
                {tooltip && <Tooltip>{tooltip}</Tooltip>}
                {required && <span style={{ color: 'rgb(164, 38, 44)', padding: '0 2px' }}>*</span>}
              </Label>
            )}
            <ComboBox
              {...others}
              options={multiOptions}
              multiSelect
              selectedKey={selectedKeys}
              errorMessage={errorMessage}
              onChange={(event, option, index, value) => {
                const selected = option?.selected;

                if (!option && value) {
                  setMultiOptions([...multiOptions, { key: value, text: value }]);
                  const keys = [...selectedKeys, value];
                  setSelectedKeys(keys);
                  onChange(keys);
                }

                if (option) {
                  const keys = selected ? [...selectedKeys, option.key] : selectedKeys.filter((k) => k !== option.key);
                  setSelectedKeys(keys);
                  onChange(keys);
                }
              }}
            />
          </>
        );
      }}
    />
  );
};

export default ControlledMultiSelectComboBox;
