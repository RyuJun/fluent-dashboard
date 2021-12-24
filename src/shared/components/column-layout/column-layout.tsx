import React, { CSSProperties } from 'react';
import { Stack, mergeStyleSets } from '@fluentui/react/';

import { Tooltip } from 'shared/components/tooltip';
import useGetThemePalette from 'shared/hooks/useGetThemePalette';

interface IColumnLayout {
  /** label 의 고정 width 지정 */
  labelWidth: number;
  /** 표현될 column 수 */
  column: number;
  /** <ColumnLayoutItem ... /> */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any[] | any;
}
interface IColumnLayoutItem {
  /** label */
  label?: string | React.ReactElement;
  /** value */
  value?: JSX.Element | string | number;
  /** tooltip 메세지 */
  tooltip?: string | React.ReactElement;
  required?: boolean;
  /** container 여부 */
  isContainer?: boolean;
  /** label 의 bg 색상 사용 여부 (info 에서 사용하기 위함) */
  isTransparentLabel?: boolean;
  column?: number; // item column 지정
  /** item label width 지정 */
  labelWidth?: number;
  valueStyle?: CSSProperties;
  maxWidth?: number;
  order?: number;
}

const ColumnLayout = ({ labelWidth, column, children }: IColumnLayout): React.ReactElement => {
  const [columnSet, setColumnSet] = React.useState(column ? column : 2);
  const [labelSet, setLabelSet] = React.useState(labelWidth ? labelWidth : 300);

  React.useEffect(() => {
    setColumnSet(column);
    setLabelSet(labelWidth);
  }, [column, labelWidth]);

  return (
    <Stack className="column-layout-wrapper" data-column={columnSet} data-label-width={labelSet}>
      {children}
    </Stack>
  );
};

const ColumnLayoutItem = ({
  label,
  value,
  tooltip,
  required,
  isContainer,
  isTransparentLabel,
  valueStyle,
  maxWidth,
  order,
}: IColumnLayoutItem): React.ReactElement => {
  const theme = useGetThemePalette();
  const itemRef = React.useRef(null);

  const [labelWidth, setLabelWidth] = React.useState(0);
  const [column, setColumn] = React.useState(0);
  React.useEffect(() => {
    const parentNode = itemRef.current.parentNode;
    let setTimeoutControl = null;
    if (parentNode) {
      if (parentNode.getAttribute('data-column')) {
        setTimeoutControl = setTimeout(() => {
          setLabelWidth(Number(parentNode.getAttribute('data-label-width')));
          setColumn(Number(parentNode.getAttribute('data-column')));
        }, 0);
      } else {
        setTimeoutControl = setTimeout(() => {
          setLabelWidth(Number(parentNode.parentNode.getAttribute('data-label-width')));
          setColumn(Number(parentNode.parentNode.getAttribute('data-column')));
        }, 0);
      }
    }
    return () => clearTimeout(setTimeoutControl);
  }, [label, value]);

  const classNames = mergeStyleSets({
    columnLayoutItemWrapper: {
      flex: isContainer ? '1 1 100%' : `1 1 ${100 / column - column}%`,
      maxWidth: maxWidth ? maxWidth : 'auto',
      order: order,
    },
    columnLayoutLabel: {
      flexBasis: labelWidth,
      background: isTransparentLabel ? 'transparent !important' : 'inherit',
    },
    columnLayoutValue: {
      flexBasis: label ? `calc(100% - ${Number(labelWidth)}px)` : '100%',
    },
    columnLayoutValueContent: {
      padding: isContainer ? 0 : '10px 20px',
      width: '100%',
    },
  });

  const checkChildren = (val: JSX.Element | string | number): JSX.Element | string | number => {
    if (val === undefined || val === null) return '';
    if (typeof val === 'string' && !val) return '';
    if (
      typeof val === 'object' &&
      !Array.isArray(val) &&
      'children' in val.props &&
      (val.props.children === null || val.props.children === undefined)
    )
      return '';
    return val;
  };

  return (
    <>
      <div
        className={`column-layout-item ${classNames.columnLayoutItemWrapper}`}
        ref={itemRef}
        data-column={column}
        data-label-width={labelWidth}
      >
        {labelWidth ? (
          <>
            {label && (
              <div className={`column-layout-label ${classNames.columnLayoutLabel}`} data-bg={theme.config.theme}>
                {label}
                {tooltip && <Tooltip>{tooltip}</Tooltip>}
                {required && <span style={{ color: 'rgb(164, 38, 44)', padding: '0 2px' }}>*</span>}
              </div>
            )}
            <div style={valueStyle && valueStyle} className={`column-layout-value ${classNames.columnLayoutValue}`}>
              {checkChildren(value)}
            </div>
          </>
        ) : undefined}
      </div>
    </>
  );
};
ColumnLayout.Item = ColumnLayoutItem;

export { ColumnLayout, ColumnLayoutItem };
