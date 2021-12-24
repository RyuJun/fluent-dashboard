import { ComboBox, IComboBox, IComboBoxOption, IComboBoxProps, Label } from '@fluentui/react';
import { uniqBy } from 'lodash';
import React from 'react';
import { Controller } from 'react-hook-form';
import { Tooltip } from 'shared/components/tooltip';
import { labelStyles } from 'shared/variables/fluent.constants';
import { HookFormProps } from './HookFormProps';

interface ICustomComboboxProps extends IComboBoxProps {
  conditionFunc?: (value) => void;
}

export const ControlledCombobox: React.FC<HookFormProps & ICustomComboboxProps> = (props) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      rules={props.rules}
      defaultValue={props.defaultValue || ''}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const { label, required, disabled, tooltip, options, defaultValue, allowFreeform, conditionFunc, ...prop } =
          props;

        const [comboBoxOptions, setComboBoxOptions] = React.useState([]);
        const [selectedKey, setSelectedKey] = React.useState(null);

        React.useEffect(() => {
          setSelectedKey(value);

          setComboBoxOptions(uniqBy([...options, { key: `${value as string}`, text: `${value as string}` }], 'key'));
        }, [value]);

        const handleChange = (
          event: React.FormEvent<IComboBox>,
          option?: IComboBoxOption,
          index?: number,
          value?: string,
          prefValue?: unknown
        ): void => {
          const key = option?.key;

          if (allowFreeform && !option && value) {
            setComboBoxOptions([...comboBoxOptions, { key: value, text: value }]);
            setSelectedKey(value);
            onChange(value);
          }

          if (option) {
            setSelectedKey(key);
            onChange(key);
          }
          const checkData = key ? key : value;
          conditionFunc && prefValue !== checkData && conditionFunc(checkData);
        };

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
              {...prop}
              options={comboBoxOptions}
              selectedKey={selectedKey}
              onChange={(
                event: React.FormEvent<IComboBox>,
                option?: IComboBoxOption,
                index?: number,
                currentVal?: string
              ) => handleChange(event, option, index, currentVal, value)}
              allowFreeform={allowFreeform || false}
              errorMessage={error && error.message}
            />
          </>
        );
      }}
    />
  );
};

export default ControlledCombobox;
