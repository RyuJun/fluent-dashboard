import { IIconStyles, Icon } from '@fluentui/react/lib/Icon';
import { ITooltipHostStyles, TooltipHost } from '@fluentui/react/lib/Tooltip';

import { ITooltipProps } from './tooltip-types';
import React from 'react';
import { useId } from '@fluentui/react-hooks/lib/useId';
import { DirectionalHint } from '@fluentui/react/lib/Callout';

const tooltipStyles: Partial<ITooltipHostStyles> = {
  root: {
    paddingLeft: 3,
    fontSize: 12,
    maxWidth: 300,
  },
};
const iconStyles: Partial<IIconStyles> = {
  root: {
    cursor: 'pointer',
  },
};
const contentStypes = {
  padding: 10,
};

const Tooltip = ({ children }: ITooltipProps): React.ReactElement => {
  const tipId = useId('tooltip');
  return (
    <>
      <TooltipHost
        content={<div style={contentStypes}>{children}</div>}
        id={tipId}
        styles={tooltipStyles}
        directionalHint={DirectionalHint.rightCenter}
      >
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', height: 20 }}>
          <Icon iconName="Unknown" styles={iconStyles} />
        </div>
      </TooltipHost>
    </>
  );
};

export default Tooltip;
