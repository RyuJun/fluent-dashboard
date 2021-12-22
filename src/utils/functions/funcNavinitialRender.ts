export function funcNavinitialRender(datas: unknown, detailSettingKeys: ReadonlyArray<string>): Array<unknown> {
  const initialKeys: string[] = [];
  Object.entries(datas).forEach((data: [string, unknown]) => {
    const [key, val] = data;
    if (
      detailSettingKeys.includes(key) &&
      (((typeof val === 'string' || typeof val === 'number') && val) || (Array.isArray(val) && val.length > 0))
    ) {
      initialKeys.push(key);
    }
  });
  return initialKeys;
}
