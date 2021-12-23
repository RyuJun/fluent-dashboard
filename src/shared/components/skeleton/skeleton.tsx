import {
  IColumn,
  IShimmerElement,
  IShimmerStyles,
  SelectionMode,
  Shimmer,
  ShimmerElementType,
  buildColumns,
} from '@fluentui/react';

import React from 'react';
import { ShimmeredDetailsList } from '@fluentui/react/lib/ShimmeredDetailsList';
import { createListItems } from '@fluentui/example-data';
import { useConst } from '@fluentui/react-hooks';

const shimmerWithElementFirstRow: IShimmerElement[] = [
  { type: ShimmerElementType.line, height: 32, width: 66 },
  { type: ShimmerElementType.gap, width: 5 },
  { type: ShimmerElementType.line, height: 32, width: 66 },
  { type: ShimmerElementType.gap, width: 5 },
  { type: ShimmerElementType.line, height: 32, width: 66 },
  { type: ShimmerElementType.gap, width: 5 },
  { type: ShimmerElementType.line, height: 32, width: 66 },
  { type: ShimmerElementType.gap, width: 5 },
  { type: ShimmerElementType.line, height: 32, width: 140 },
  { type: ShimmerElementType.gap, width: 5 },
  { type: ShimmerElementType.line, height: 32, width: 140 },
  { type: ShimmerElementType.gap, width: 5 },
  { type: ShimmerElementType.circle, height: 27, width: 27 },
  { type: ShimmerElementType.line, height: 1, verticalAlign: 'bottom' },
];

const shimmerStyles: Partial<IShimmerStyles> = {
  root: {
    background: 'red',
    '&::after': {
      backgroundImage: 'none',
    },
  },
};

export const SkeletonTable = (): React.ReactElement => {
  const shimmerColumns: IColumn[] = useConst(() => {
    const currentItems = createListItems(1);
    const columns: IColumn[] = buildColumns(currentItems);

    for (const column of columns) {
      if (column.key === 'thumbnail') {
        column.minWidth = 16;
        column.maxWidth = 16;
        column.isIconOnly = true;
        break;
      }
    }
    return columns;
  });

  return (
    <div>
      <Shimmer shimmerElements={shimmerWithElementFirstRow} />
      <ShimmeredDetailsList
        items={[]}
        isHeaderVisible={false}
        enableShimmer
        columns={shimmerColumns}
        selectionMode={SelectionMode.none}
        styles={shimmerStyles}
      />
      <Shimmer shimmerElements={[{ type: ShimmerElementType.line, height: 1, verticalAlign: 'bottom' }]} />
      <div style={{ display: 'flex', margin: '10px 0', gap: 'calc(50% - 190px)' }}>
        <div style={{ flex: '0 0 48%', flexBasis: 190, overflow: 'hidden' }}>
          <Shimmer shimmerElements={[{ type: ShimmerElementType.line, height: 22 }]} />
        </div>
        <div style={{ flex: '0 0 48%', flexBasis: 190, overflow: 'hidden' }}>
          <Shimmer shimmerElements={[{ type: ShimmerElementType.line, height: 22 }]} />
        </div>
      </div>
    </div>
  );
};

const shimmerWithElementTypeC: IShimmerElement[] = [
  { type: ShimmerElementType.line, height: 40, width: 200 },
  { type: ShimmerElementType.gap, width: 2 },
  { type: ShimmerElementType.line, height: 1, width: 'calc(100% - 200px)', verticalAlign: 'bottom' },
];
export const SkeletonTypeC = (): React.ReactElement => {
  return (
    <div className="flex-container flex-col gap-2">
      <Shimmer shimmerElements={[{ type: ShimmerElementType.line, height: 36, width: '100%' }]} />
      {}
      <Shimmer shimmerElements={shimmerWithElementTypeC} />
      <Shimmer shimmerElements={shimmerWithElementTypeC} />
      <Shimmer shimmerElements={shimmerWithElementTypeC} />
      <Shimmer shimmerElements={shimmerWithElementTypeC} />
      <Shimmer shimmerElements={shimmerWithElementTypeC} />
      <Shimmer shimmerElements={shimmerWithElementTypeC} />
      <Shimmer shimmerElements={shimmerWithElementTypeC} />
    </div>
  );
};
