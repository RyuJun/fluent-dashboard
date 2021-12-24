import { DefaultButton, Dialog, DialogFooter, DialogType, IStackStyles, Stack } from '@fluentui/react/lib';
import { Icon, PrimaryButton, mergeStyleSets } from '@fluentui/react';
import React, { Fragment, useState } from 'react';

import deepCopy from 'utils/functions/deep-copy';
import { footerStackProps } from 'shared/variables/fluent.constants';
import { scrollToElm } from 'utils/functions/scroll';
import { useBoolean } from '@fluentui/react-hooks';
import useGetThemePalette from 'shared/hooks/useGetThemePalette';
import { useTranslation } from 'react-i18next';
import useWindowSize from 'shared/hooks/useWindowSize';

interface ItitleLink {
  type?: string;
  count?: number;
  onClickTitleLink?: () => void;
}
type T_FuncNavi = {
  title?: string;
  mode?: 'edit' | 'view';
  isNavigationTitle?: boolean;
  initialRender?: string[];
  footerRender?: JSX.Element;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any[] | any;
  controller?: boolean;
  onClose?: (key) => void | boolean;
  onDismiss?: () => void;
};
type T_FuncNaviItem = {
  title: string;
  id: string;
  mode?: 'edit' | 'view';
  titleLink?: ItitleLink;
  hiddenTitleArea?: boolean;
  editRender: JSX.Element;
  viewRender?: JSX.Element;
  moreViewRender?: JSX.Element;
  moreEditRender?: JSX.Element;
  firstLoad?: boolean;
  renderingList?: string[];
  updateRenderingList?: (updateKey) => void;
  deleteDetailItem?: (hasSubId: boolean, count: number, subTitle: string) => void;
};

const stackLeftStyles: IStackStyles = {
  root: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
};

const FunctionNavigation = ({
  title,
  mode,
  isNavigationTitle,
  onDismiss,
  children,
  footerRender,
  initialRender,
  onClose,
}: T_FuncNavi): React.ReactElement => {
  const [width, height, device] = useWindowSize();
  const scrolledRef = React.useRef(null);
  const [renderingList, setRenderingList] = React.useState(initialRender ? initialRender : []);
  const [fnHeight, setFnHeight] = React.useState(0);
  const fnFooterRef = React.useRef(null);
  const rendering = !children.length ? [children] : children;
  const [isRightContentVisible, { toggle: toggleIsRightContentVisible }] = useBoolean(false);
  const theme = useGetThemePalette();
  const { t } = useTranslation();

  const classNames = mergeStyleSets({
    rightContent: {
      position: 'sticky',
      top: 0,
      right: 0,
      minWidth: 200,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      width: 0,
      background: theme.customColorsSet.functionNavigationRightContent,
    },
    footerContent: {
      position: 'relative',
      zIndex: 1,
      width: '100%',
      borderTop: '1px solid #979797',
      padding: '0 30px;',
      boxShadow: '0px -7px 14px rgb(0 0 0 / 5%)',
    },
  });

  React.useEffect(() => {
    setRenderingList(initialRender);
  }, [initialRender]);

  React.useEffect(() => {
    const delay = setTimeout(() => {
      if (fnFooterRef.current) {
        setFnHeight(Number(fnFooterRef.current.offsetHeight) + Number(isNavigationTitle ? 46 : 0) + 2);
      }
    }, 300);
    return () => {
      clearTimeout(delay);
    };
  }, []);

  const scrollMove = (scrolledkey, type) => {
    let target = null;
    scrolledRef.current.querySelectorAll(type === 'main' ? '.fn-left-content' : '.fn-item-wrapper').forEach((item) => {
      if (item.getAttribute('data-scrolledKey') === scrolledkey) {
        target = item;
      }
    });
    if (target) {
      scrollToElm(scrolledRef.current, target, 400);
    }
  };

  const updateRenderingList = (updateKey) => {
    if (renderingList.includes(updateKey)) {
      const newRenderingList = deepCopy(renderingList);
      newRenderingList.splice(newRenderingList.indexOf(updateKey), 1);
      setRenderingList(newRenderingList);
    } else {
      setRenderingList([...renderingList, updateKey]);
    }
  };
  const [hideDialog, setHideDialog] = useState(true);

  const dialogContentProps = {
    type: DialogType.normal,
    title: t('common:detail-all-delete-title'),
    closeButtonAriaLabel: 'Close',
    subText: t('messages:detail-all-delete-subtext'),
  };
  const [detailNavId, setDetailNavId] = useState('');

  const deleteDetailItem = (hasSubId: boolean, count: number, subid: string) => {
    if (hasSubId && count > 0) {
      setHideDialog(false);
      setDetailNavId(subid);
    } else {
      updateRenderingList(subid);
    }
  };

  return (
    <>
      <Dialog
        hidden={hideDialog}
        onDismiss={() => setHideDialog(true)}
        dialogContentProps={dialogContentProps}
        //   modalProps={modalProps}
      >
        <DialogFooter>
          <PrimaryButton
            onClick={() => {
              setHideDialog(true);
              if (onClose) {
                if (onClose(detailNavId) === true) return;
              }

              updateRenderingList(detailNavId);
            }}
            text={t('common:confirm')}
          />
          <DefaultButton onClick={() => setHideDialog(true)} text={t('common:cancel')} />
        </DialogFooter>
      </Dialog>
      <div
        className="function-navigation-wrapper custom-scrollbar"
        ref={scrolledRef}
        style={{
          height: footerRender ? `calc(100% - ${fnHeight}px)` : '100%',
        }}
      >
        <Stack className="fn-left-wrapper" styles={stackLeftStyles}>
          {rendering.length && (
            <>
              {rendering.map((fnItem, i) => {
                const { id, title, mode, titleLink, viewRender, hiddenTitleArea, editRender, moreEditRender } =
                  fnItem.props;
                return (
                  <div key={`child ${String(i)}`} className="fn-left-content" data-scrolledkey={id}>
                    <FunctionNavigationItem
                      id={id}
                      title={title}
                      mode={mode ? mode : 'edit'}
                      titleLink={titleLink}
                      hiddenTitleArea={hiddenTitleArea}
                      viewRender={viewRender}
                      editRender={editRender}
                      moreEditRender={moreEditRender}
                      renderingList={renderingList}
                      updateRenderingList={updateRenderingList}
                      firstLoad
                      deleteDetailItem={deleteDetailItem}
                    />
                  </div>
                );
              })}
            </>
          )}
        </Stack>

        <Stack className={`fn-right-wrapper ${isRightContentVisible ? 'visible' : ''} ${classNames.rightContent}`}>
          {title && <div className="fn-main-title">{title}</div>}
          {rendering.length && (
            <>
              {rendering.map((fnItem, i) => {
                const { id, title, mode, editRender, viewRender } = fnItem.props;

                const renderMode =
                  mode === 'view' ? (!viewRender ? editRender.props : viewRender.props) : editRender.props;

                const [isSubTitleVisible, { toggle: toggleIsSubTitleVisible }] = useBoolean(true);

                const makeId = [];

                if (typeof renderMode.children === 'object') {
                  if (renderMode.children.length) {
                    renderMode.children.forEach((item) => {
                      if (item.props && item.props.id) {
                        makeId.push(item);
                      }
                    });
                  } else {
                    if (renderMode.children.props.id) {
                      makeId.push(renderMode.children);
                    }
                  }
                } else if (typeof renderMode.children === 'undefined') {
                  renderMode.id && makeId.push(renderMode);
                }

                return (
                  <Fragment key={`children_${String(i)}`}>
                    <Stack>
                      <Stack className="fn-right-title" style={{ padding: 8 }}>
                        <div
                          style={{ width: '100%' }}
                          onClick={() => {
                            scrollMove(id, 'main');
                          }}
                        >
                          {title}
                        </div>
                        {makeId.length &&
                          (isSubTitleVisible ? (
                            <Icon iconName="ChevronUp" onClick={toggleIsSubTitleVisible} />
                          ) : (
                            <Icon iconName="ChevronDown" onClick={toggleIsSubTitleVisible} />
                          ))}
                      </Stack>

                      {makeId.length ? (
                        <div style={{ display: isSubTitleVisible ? 'block' : 'none' }}>
                          {makeId.map((sub) => {
                            const renderingListHasSubId = renderingList.includes(sub.props.id);
                            return (
                              <Fragment key={sub.props.id}>
                                <Stack horizontal className="fn-right-subtitle">
                                  <Stack
                                    style={{ color: renderingListHasSubId ? '#5299F3' : '#C8C6C4' }}
                                    onClick={() => {
                                      deleteDetailItem(renderingListHasSubId, sub.props.titleLink?.count, sub.props.id);

                                      setTimeout(() => {
                                        scrollMove(sub.props.id, 'sub');
                                      }, 0);
                                    }}
                                  >
                                    {renderingListHasSubId ? (
                                      <Icon iconName="CompletedSolid" />
                                    ) : (
                                      <Icon iconName="Completed" />
                                    )}
                                  </Stack>
                                  <Stack
                                    style={{ color: renderingListHasSubId ? '#5299F3' : '#C8C6C4' }}
                                    onClick={() => {
                                      setTimeout(() => {
                                        if (renderingListHasSubId) {
                                          scrollMove(sub.props.id, 'sub');
                                        } else {
                                          updateRenderingList(sub.props.id);
                                          // resetDetail && resetDetail(subTitle);
                                          setTimeout(() => {
                                            scrollMove(sub.props.id, 'sub');
                                          }, 0);
                                        }
                                      }, 0);
                                    }}
                                  >
                                    <div title={sub.props.title}>{sub.props.title}</div>
                                  </Stack>
                                </Stack>
                              </Fragment>
                            );
                          })}
                        </div>
                      ) : undefined}
                    </Stack>
                  </Fragment>
                );
              })}
            </>
          )}
        </Stack>
      </div>
      {device !== 'big' && (
        <div className="fn-toggle-button-wrapper">
          <div className="fn-toggle-button" onClick={toggleIsRightContentVisible}>
            {isRightContentVisible ? <Icon iconName="CalculatorSubtract" /> : <Icon iconName="Add" />}
          </div>
        </div>
      )}
      {mode === 'view' && onDismiss && (
        <div ref={fnFooterRef} className={classNames.footerContent}>
          <Stack {...footerStackProps}>
            <DefaultButton onClick={onDismiss} text={t('common:back')} />
          </Stack>
        </div>
      )}
      {mode === 'edit' && footerRender && (
        <div ref={fnFooterRef} className={classNames.footerContent}>
          {footerRender}
        </div>
      )}
    </>
  );
};
export const FunctionNavigationItem: React.FC<T_FuncNaviItem> = ({
  id,
  title,
  mode,
  titleLink,
  viewRender,
  editRender,
  hiddenTitleArea,
  moreEditRender,
  firstLoad,
  renderingList,
  updateRenderingList,
  deleteDetailItem,
}) => {
  const [renderingSetting, setRenderingSetting] = React.useState([]);
  const [isContentVisible, setIsContentVisible] = React.useState(true);
  const [isDetailVisible, setIsDetailVisible] = React.useState(false);
  const [firstViewLoad, setFirstViewLoad] = React.useState(false);

  const render = mode === 'view' ? (!viewRender ? editRender : viewRender) : editRender;
  const theme = useGetThemePalette();
  const { t } = useTranslation();

  React.useEffect(() => {
    const newRenderingList = [];
    if (typeof render.props.children === 'object' && renderingList) {
      if (render.props.children.length) {
        render.props.children.forEach((item) => {
          if (item.props && renderingList.includes(item.props.id)) {
            newRenderingList.push({
              ...item,
              props: {
                ...item.props,
                updateRenderingList: updateRenderingList,
                deleteDetailItem: deleteDetailItem,
              },
            });
          }
        });
      } else {
        if (render.props.children.props.id) {
          if (renderingList.includes(render.props.children.props.id)) {
            newRenderingList.push({
              ...render,
              props: {
                ...render.props,
                children: {
                  ...render.props.children,
                  props: {
                    ...render.props.children.props,
                    updateRenderingList: updateRenderingList,
                    deleteDetailItem: deleteDetailItem,
                  },
                },
              },
            });
          }
        } else {
          newRenderingList.push(render);
        }
      }
    } else {
      newRenderingList.push(render);
    }
    setRenderingSetting(newRenderingList);
  }, [renderingList, editRender, viewRender, moreEditRender]);

  React.useEffect(() => {
    // setIsContentVisible(mode === 'edit');
    setFirstViewLoad(true);

    if (mode === 'view') {
      if (titleLink) {
        setIsContentVisible(Boolean(titleLink.count));
      } else {
        setIsContentVisible(true);
      }
    }
  }, []);

  React.useEffect(() => {
    if (firstViewLoad) {
      if (mode === 'view') {
        setIsContentVisible(true);
      }
      setIsDetailVisible(mode === 'edit');
    }
  }, [mode]);

  const classNames = mergeStyleSets({
    firstLoadTitle: {
      background: theme.customColorsSet.functionNavigationTitle,
      border: 'none !important',
    },
    successWrapper: {
      background: theme.customColorsSet.functionNavigationTitle,
    },
    wrapper: {},
    title: {},
    content: {},
    detailWrapper: {},
    detailTitle: { border: 'none !important' },
    detailContent: {},
  });
  return (
    <div className={`fn-item-wrapper ${classNames.wrapper}`} data-scrolledkey={id}>
      <div
        className={`fn-item-title ${firstLoad && classNames.firstLoadTitle} ${firstLoad ? 'sticky-title' : ''}`}
        style={{ display: hiddenTitleArea ? 'none' : 'flex' }}
      >
        {!firstLoad && (
          <Icon
            iconName={isContentVisible ? 'ChevronDownMed' : 'ChevronRightMed'}
            onClick={() => {
              setIsContentVisible(!isContentVisible);
            }}
          />
        )}
        {title}
        {titleLink && (
          <>
            {mode === 'view' ? (
              <div className="fn-list-count">{titleLink.count}</div>
            ) : (
              <div className="fn-list-link" onClick={titleLink.onClickTitleLink}>
                {titleLink.type && `+ ${titleLink.type}`}
              </div>
            )}
          </>
        )}
        {viewRender && editRender && (
          <Stack
            tokens={{ childrenGap: 20 }}
            horizontal
            style={{ marginLeft: 'auto', fontSize: 12, cursor: 'pointer' }}
          >
            {!firstLoad && mode === 'edit' && (
              <Icon
                iconName="Clear"
                className="clear-rendering"
                onClick={() => {
                  deleteDetailItem(true, titleLink.count, id);
                }}
              />
            )}
          </Stack>
        )}
      </div>
      <div
        className={`fn-item-content ${classNames.content} ${
          !firstLoad && !isContentVisible && 'fn-item-content-visible'
        }`}
      >
        {renderingSetting.length
          ? renderingSetting.map((rendering, i) => {
              return <Fragment key={`${String(rendering.props.title)}_${i}`}>{rendering}</Fragment>;
            })
          : undefined}
        {mode === 'edit' && moreEditRender && (
          <div className={`fn-item-detail-wrapper ${classNames.detailWrapper}`}>
            <div className={`fn-item-title fn-item-detial-title ${classNames.detailTitle}`}>
              <Icon
                iconName={isDetailVisible ? 'CalculatorSubtract' : 'CalculatorAddition'}
                onClick={() => {
                  setIsDetailVisible(!isDetailVisible);
                }}
              />
              {t('common:more-setting')}
            </div>
            <div
              className={`fn-item-detail-content ${classNames.detailContent}`}
              style={{ display: isDetailVisible ? 'block' : 'none' }}
            >
              {moreEditRender}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

FunctionNavigation.Item = FunctionNavigationItem;

export { FunctionNavigation };
