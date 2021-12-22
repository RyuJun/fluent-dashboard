/* eslint-disable @typescript-eslint/no-unsafe-return */
/**
 * _WGrid 는 (string | number)[] 만 허용하나,
 * bindedItems에는Array<string | number> | string | number | null 타입이 올 수 있습니다.
 * 따라서, 여러 다양한 타입을 (string | number)[] 로 변환해 주어야 합니다.
 */
export const convertBindedItemsToArray = (
  bindedItems: Array<string | number> | string | number | null
): Array<string | number> => {
  if (bindedItems === null) return [];

  return bindedItems instanceof Array ? bindedItems : [bindedItems];
};

/**
 * WGrid나 BindingGrid 모두에서 사용 가능한 공통함수
 * 각 개발자별로 정의한 column 정보에 영향을 주지 않도록 하기 위함
 * keyNames에 해당하는 column은 editable이 true 상태로 사용할 수 있게 된다.
 */
export const editables = (cols: any, keyNames: Array<string>): any => {
  return cols.map((col: any): any => {
    if (keyNames.indexOf(col.field) !== -1) {
      col.editable = true;
    }
    return col;
  });
};
