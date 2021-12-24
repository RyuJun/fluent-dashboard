import React, { useState } from 'react';
import { TOAST } from 'shared/variables/common.constants';
import { MessageBar, MessageBarType } from '@fluentui/react';

interface ICustomToast {
  close: () => void;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any;
}

export const CustomToast = ({ close, message, options }: ICustomToast): React.ReactElement => {
  const delay = options.delay ? options.delay : TOAST.delay;
  const [timer, setTimer] = React.useState(null);

  React.useEffect(() => {
    options.delay !== 0 && setTimer(setTimeout(close, delay));
  }, []);

  const handlePauseTimer = (): void => options.delay !== 0 && clearTimeout(timer);
  const handleResumeTimer = (): void => options.delay !== 0 && setTimer(setTimeout(close, delay));
  return (
    <div onMouseEnter={handlePauseTimer} onMouseLeave={handleResumeTimer}>
      <MessageBar messageBarType={MessageBarType[String(options.type)]} onDismiss={() => close()}>
        {message}
      </MessageBar>
    </div>
  );
};
