export const calculateCommunicationSpeed = (val: number | string, unit: string): number => {
  const numberVal = Number(val);
  if (numberVal && !isNaN(numberVal)) {
    if (unit === 'bps') {
      return numberVal * 1;
    } else if (unit === 'Kbps') {
      return numberVal * 1000;
    } else if (unit === 'Mbps') {
      return numberVal * 1000000;
    }
  }
  return numberVal;
};
