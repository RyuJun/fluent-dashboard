import * as React from 'react';

import { Controller, useFormContext } from 'react-hook-form';
import { IIconProps, ITextFieldProps, Icon, Label, Stack, TextField } from '@fluentui/react';

import { HookFormProps } from './HookFormProps';
import { Tooltip } from 'shared/components/tooltip';
import { labelStyles } from 'shared/variables/fluent.constants';
import useGetThemePalette from 'shared/hooks/useGetThemePalette';
import { useTranslation } from 'react-i18next';
import { isEqual } from 'lodash';
export interface ICustomInputWithIconProps extends ITextFieldProps {
  itemRenderer?: (values, onClickInputDeleteIcon) => React.ReactElement;
  onClickInputAddIcon: () => void;
  onClickInputDeleteIcon: (data: string | number) => void;
  conditionFunc?: (value) => void;
}
const IinputIconPorps: Partial<IIconProps> = {
  iconName: 'Add',
  styles: {
    root: {
      position: 'static',
      display: 'flex',
      alignItems: 'center',
      marginRight: 10,
      cursor: 'pointer',
      pointerEvents: 'auto',
      fontSize: 12,
    },
  },
};
export const ControlledInputWithIcon: React.FC<HookFormProps & ICustomInputWithIconProps> = (props) => {
  const { t } = useTranslation();
  const [listData, setListData] = React.useState([]);
  const theme = useGetThemePalette();
  const {
    label,
    disabled,
    tooltip,
    required,
    control,
    name,
    styles,
    itemRenderer,
    onClickInputAddIcon,
    onClickInputDeleteIcon,
    conditionFunc,
    ...prop
  } = props;

  const {
    formState: { errors },
  } = useFormContext();

  const checkCanAddList = (value) => {
    if (onClickInputAddIcon && value && !listData.includes(String(value))) {
      onClickInputAddIcon();
    }
  };

  return (
    <Stack styles={styles}>
      <Controller
        name={`${name}-text`}
        control={control}
        defaultValue={props.defaultValue ?? ''}
        render={({ field: { onChange, name: fieldName, value }, fieldState: { error: textError } }) => {
          return (
            <Stack>
              {label && (
                <Label disabled={disabled} styles={labelStyles}>
                  {label}
                  {tooltip && <Tooltip>{tooltip}</Tooltip>}
                  {required && <span style={{ color: 'rgb(164, 38, 44)', padding: '0 2px' }}>*</span>}
                </Label>
              )}
              <TextField
                {...prop}
                onChange={(e) => onChange(e)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    checkCanAddList(value);
                  }
                }}
                value={value ?? ''}
                name={fieldName}
                errorMessage={
                  textError
                    ? textError.message
                    : errors[name]
                    ? errors[name].message
                    : listData.includes(String(value)) && t('validation:duplicated')
                }
                defaultValue={undefined}
                disabled={disabled}
                iconProps={{
                  ...IinputIconPorps,
                  onClick: () => checkCanAddList(value),
                }}
              />
            </Stack>
          );
        }}
      />
      <Controller
        name={name}
        control={control}
        defaultValue={props.defaultValue ?? ''}
        render={({ field: { value } }) => {
          React.useEffect(() => {
            conditionFunc && !isEqual(listData, value) && conditionFunc(listData);
            setListData(value.map((val) => String(val)));
          }, [value]);
          return (
            <div
              className="custom-scrollbar"
              style={{
                display: 'flex',
                width: '100%',
                height: 'auto',
                flexDirection: 'column',
                overflowY: 'auto',
                maxHeight: 116,
                marginTop: 5,
                gap: 5,
              }}
            >
              {itemRenderer ? (
                itemRenderer(value, onClickInputDeleteIcon)
              ) : (
                <>
                  {value.map((data, idx: number) => {
                    return (
                      <div
                        key={`inputWithIcon_${idx}`}
                        style={{
                          display: 'flex',
                          width: '100%',
                          minHeight: 32,
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          background: theme.customColorsSet.functionNavigationTitle,
                          padding: '0 10px',
                        }}
                      >
                        {data}
                        <Icon
                          onClick={() => {
                            onClickInputDeleteIcon(data);
                          }}
                          iconName="Cancel"
                          style={{ cursor: 'pointer' }}
                        />
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          );
        }}
      />
    </Stack>
  );
};

export default ControlledInputWithIcon;
