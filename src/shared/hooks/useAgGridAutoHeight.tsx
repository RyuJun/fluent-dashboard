import React from 'react';

interface IUseAgGridAutoHeight {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  api: any;
  mode: 'edit' | 'view';
  isAutoHeight: boolean;
  items?: unknown;
  delay?: number;
  first?: boolean;
  forceUpdate?: boolean;
  setAutoHeightLoad?: (setTrue) => void;
}

const UseAgGridAutoHeight = ({
  api,
  isAutoHeight,
  setAutoHeightLoad,
  mode,
  items,
  delay,
  first,
  forceUpdate,
}: IUseAgGridAutoHeight): void => {
  React.useEffect(() => {
    if (api && isAutoHeight) {
      const setGridAutoHeight = () => {
        const bodyViewPort = api.gridBodyComp.eBodyViewport;
        const gridLeft = bodyViewPort.children.left;
        const gridRight = bodyViewPort.children.right;
        const gridBody = bodyViewPort.children.center;
        const gridRows = Array.prototype.slice.call(gridBody.querySelector('.ag-center-cols-container').children);
        const prevMax = [];

        gridRows.forEach((row, i) => {
          const columns = Array.prototype.slice.call(row.children);
          const height = [];
          columns.forEach((column, j) => {
            const insideAgGrid = column.querySelector('.ag-react-container');
            let depth = 0;
            const recursive = (grid) => {
              depth++;
              height.push(Number(grid.offsetHeight) + 30 * (depth - 1));
              if (grid.querySelector('.ag-react-container')) {
                recursive(grid.querySelector('.ag-react-container'));
              }
            };
            if (insideAgGrid) recursive(insideAgGrid);
            column.style.paddingLeft = insideAgGrid ? 0 : 17;
            column.style.paddingRight = insideAgGrid ? 0 : 17;
            height.push(insideAgGrid ? insideAgGrid.offsetHeight : column.offsetHeight);
          });
          const max = Math.max.apply(null, height);
          prevMax.push(max);
          const sum = [...prevMax].filter((_, j) => j !== i).reduce((prev, cur) => Number(prev) + Number(cur), 0);
          row.style.height = `${max}px`;
          row.style.transform = `translateY(${i === 0 ? 0 : Number(sum)}px)`;
          gridLeft.children[i].style.height = `${max}px`;
          gridLeft.children[i].style.transform = `translateY(${i === 0 ? 0 : Number(sum)}px)`;
          gridRight.children[i].style.height = `${max}px`;
          gridRight.children[i].style.transform = `translateY(${i === 0 ? 0 : Number(sum)}px)`;
        });
        const sumHeight = Number(prevMax.reduce((prev, cur) => Number(prev) + Number(cur), 0));
        gridBody.querySelector('.ag-center-cols-container').style.height = `${sumHeight}px`;
        gridRight.style.height = `${sumHeight}px`;
        gridLeft.style.height = `${sumHeight}px`;
        bodyViewPort.querySelector('.ag-center-cols-clipper').style.height = `${sumHeight}px`;
        setAutoHeightLoad(true);
      };
      const functionAutoHeight = setTimeout(
        () => {
          // first ? setTimeout(() => setGridAutoHeight(), 300) : setGridAutoHeight();
          setGridAutoHeight();
        },
        delay ? delay : 300
      );
      return () => clearTimeout(functionAutoHeight);
    }
  }, [api, isAutoHeight, mode, items, forceUpdate]);
};

export default UseAgGridAutoHeight;
