import { ComboBox, IComboBox, IComboBoxOption, IComboBoxProps } from '@fluentui/react/lib/ComboBox';
import { Label, Stack, Tooltip } from '@fluentui/react';

import { Controller } from 'react-hook-form';
import { CustomError } from 'shared/api/error';
import { HookFormProps } from 'shared/hook-form/HookFormProps';
import React from 'react';
import { getList } from 'shared/api/requests';
import { labelStyles } from 'shared/variables/fluent.constants';
import { orderBy } from 'lodash';
import { useQuery } from 'react-query';

export interface CustomIComboBoxProps extends IComboBoxProps {
  state?: number[] & string[];
  defaultKey?: string;
  path: string;
  setValue: (state) => void;
}

const RequestComboBox: React.FC<HookFormProps & CustomIComboBoxProps> = (props) => {
  const orderKey = props.defaultKey ? props.defaultKey : 'id';

  const { isLoading, data } = useQuery<any[], CustomError>(props.name, () =>
    getList(props.path, (restData) => orderBy(restData, orderKey, ['asc']))
  );

  const [options, setOptions] = React.useState([]);

  React.useEffect(() => {
    data &&
      setOptions(
        data.map((item) => {
          return { key: String(item[orderKey]), text: String(item[orderKey]) };
        })
      );
  }, [data]);

  if (isLoading) {
    return <>loading...</>;
  }

  return (
    <Controller
      name={props.name}
      control={props.control}
      rules={props.rules}
      defaultValue={props.defaultValue || ''}
      render={({ field: { onChange, name: fieldName, value }, fieldState: { error } }) => {
        const { label, required, disabled, tooltip, styles, ...prop } = props;
        const _value = value ? (Array.isArray(value) ? value.map((v) => String(v)) : [value]) : [];
        const [selectedKeys, setSelectedKeys] = React.useState<string[]>(_value);

        React.useEffect(() => {
          props.setValue(selectedKeys);
        }, [selectedKeys]);

        const handleOnItemClick = (event: React.FormEvent<IComboBox>, option?: IComboBoxOption): void => {
          const selected = option?.selected;
          if (option) {
            setSelectedKeys((prevSelectedKeys) => {
              const multiSelected = selected
                ? [...prevSelectedKeys, option!.key as string]
                : prevSelectedKeys.filter((k) => k !== option!.key);

              const singleSelected =
                prevSelectedKeys.length > 0
                  ? prevSelectedKeys[0] === option!.key
                    ? []
                    : [option!.key as string]
                  : [option!.key as string];

              return prop.multiSelect ? multiSelected : singleSelected;
            });
          }
        };

        return (
          <Stack styles={styles}>
            {options.length && (
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
                  options={options}
                  styles={styles}
                  selectedKey={selectedKeys}
                  errorMessage={error && error.message}
                  multiSelect={prop.multiSelect}
                  useComboBoxAsMenuWidth
                  onItemClick={handleOnItemClick}
                />
              </>
            )}
          </Stack>
        );
      }}
    />
  );
};

export default RequestComboBox;
