export const formatNumber = (num: number): string => {
  const units = ['', 'K', 'M', 'B', 'T'];
  let unitIndex = 0;
  let value = num;

  while (value >= 1000 && unitIndex < units.length - 1) {
    value /= 1000;
    unitIndex++;
  }

  // Handle decimals
  if (Number.isInteger(value)) {
    return `${value}${units[unitIndex]}`;
  }

  // Remove trailing zeros and unnecessary decimal point
  const formatted = value.toFixed(2).replace(/\.?0+$/, '');
  return `${formatted}${units[unitIndex]}`;
};

export const formatCurrency = (amount: number): string => {
  return `$${formatNumber(amount)}`;
};
