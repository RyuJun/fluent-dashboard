import { DefaultButton, Stack } from '@fluentui/react/lib';

import React from 'react';
import { footerStackProps } from 'shared/variables/fluent.constants';
import { mergeStyleSets } from '@fluentui/react';
import useGetThemePalette from 'shared/hooks/useGetThemePalette';
import { useTranslation } from 'react-i18next';

interface IChangeViewer {
  mode: 'view' | 'edit';
  isTitle?: boolean;
  isTitleRender?: JSX.Element;
  style?: object;
  isNavigationTitle?: boolean;
  forceUpdate?: boolean;
  isResetMode?: boolean;
  editRender: JSX.Element;
  viewRender?: JSX.Element;
  moreEditRender?: JSX.Element;
  footerRender?: JSX.Element;
  onDismiss?: () => void;
}

export const ChangeViewer = ({
  mode,
  isTitle,
  isTitleRender,
  style,
  forceUpdate,
  editRender,
  viewRender,
  moreEditRender,
  footerRender,
  onDismiss,
}: IChangeViewer): React.ReactElement => {
  const { t } = useTranslation();
  const theme = useGetThemePalette();
  const [render, setRender] = React.useState(null);
  const [fnHeight, setFnHeight] = React.useState(0);
  const fnFooterRef = React.useRef(null);

  React.useEffect(() => {
    let lazy = null;
    if (forceUpdate) {
      setRender(null);
      lazy = setTimeout(() => {
        setRender(mode === 'view' ? (!viewRender ? editRender : viewRender) : editRender);
      }, 0);
    } else {
      setRender(mode === 'view' ? (!viewRender ? editRender : viewRender) : editRender);
    }
    return () => clearTimeout(lazy);
  }, [mode, editRender, viewRender, moreEditRender, footerRender]);

  React.useEffect(() => {
    const delay = setTimeout(() => {
      if (fnFooterRef.current) {
        setFnHeight(Number(fnFooterRef.current.offsetHeight));
      }
    }, 300);
    return () => {
      clearTimeout(delay);
    };
  }, [mode]);

  const classNames = mergeStyleSets({
    layer: {
      background: theme.customColorsSet.changeViewerBgColor,
    },
    title: {
      background: theme.customColorsSet.changeViewerTitle,
    },
  });
  return (
    <div className={`change-viewer-layer ${classNames.layer}`} style={{ top: isTitle ? 50 : isTitleRender && 0 }}>
      <div
        className="change-viewer-wrapper custom-scrollbar"
        style={{
          height: footerRender ? `calc(100% - ${fnHeight}px)` : '100%',
          ...style,
        }}
      >
        {isTitleRender && isTitleRender}
        <div className={`change-viewer-title ${classNames.title}`}>
          <div className="title">{t('common:setting')}</div>
        </div>
        <div className="change-viewer-content">
          {render}
          {mode === 'edit' && moreEditRender && <div>{moreEditRender}</div>}
        </div>
      </div>
      {mode === 'view' && onDismiss && (
        <div ref={fnFooterRef} className="change-viewer-footer visible">
          <Stack {...footerStackProps}>
            <DefaultButton onClick={onDismiss} text={t('common:back')} />
          </Stack>
        </div>
      )}
      {mode === 'edit' && footerRender && (
        <div ref={fnFooterRef} className="change-viewer-footer visible">
          {footerRender}
        </div>
      )}
    </div>
  );
};
