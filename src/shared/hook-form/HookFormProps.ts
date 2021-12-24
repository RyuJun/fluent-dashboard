import React from 'react';
import { Control, UseControllerProps } from 'react-hook-form';

export interface HookFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  name: string;
  rules?: UseControllerProps['rules'];
  defaultValue?: string;
  editable?: boolean;
  tooltip?: string | React.ReactElement;
}
