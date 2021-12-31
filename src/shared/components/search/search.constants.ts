import { ICalloutContentStyles, ISearchBoxStyles, mergeStyleSets } from '@fluentui/react';

export const MAX_RECENT_SEARCH_COUNT = 5;

export const searchListStyles = mergeStyleSets({
  searchWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 1,
    background: 'inherit',
  },
  searchScrollWrapper: {
    maxHeight: 500,
    zIndex: 1,
    overflowY: 'auto',
    boxShadow: '0px 1.2px 3.6px rgba(0, 0, 0, 0.1), 0px 6.4px 14.4px rgba(0, 0, 0, 0.13)',
  },
  searchTitle: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSzie: 14,
    height: 40,
    padding: '0 12px',
  },
  searchListWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    height: 40,
    padding: '0 12px',
    cursor: 'pointer',
    fontSize: 12,
    '&.light:hover, &.active.right': {
      background: '#f6f6f6',
    },
    '&.dark:hover, &.active.dark': {
      background: 'rgb(43, 45, 52)',
    },
  },
  searchListLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  searchListRight: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
});

export const searchBoxStyles: Partial<ISearchBoxStyles> = {
  root: { width: '100%', height: '100%', background: 'inherit', border: 'none' },
  field: { color: 'white' },
  clearButton: { button: { height: '100%' } },
};

export const customTooltipStyle = mergeStyleSets({
  customTooltipWrapper: {
    padding: '17px 15px',
  },
  customTooltipHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 40,
  },
  customTooltipTitleLeft: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 600,
    fontSize: 14,
    gap: 5,
  },
  customTooltipTitleRight: {
    display: 'flex',
    alignItems: 'center',
    lineHeight: '16px',
    gap: 8,
    color: '#5299F3',
    cursor: 'pointer',
  },
  customTooltipContent: {
    paddingTop: 10,
    color: '#605E5C',
  },
});

export const calloutStyles: Partial<ICalloutContentStyles> = {
  beak: {
    borderTop: '1px solid #97979759',
    borderLeft: '1px solid #97979759',
    zIndex: 1,
  },
  calloutMain: {
    border: '1px solid #97979759',
    borderRadius: 'none',
  },
  root: { boxShadow: 'none' },
};
