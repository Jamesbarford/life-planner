export enum CurrencySymbols {
  sterling = "£",
  usd = "$",
  euro = "€"
}

export function currencyFormatter<T extends string>(
  format: string,
  amount: T
): string {
  if (amount === "") return amount;
  const formatAmount = amount.replace(/,/g, "");
  const formatAmountToNumber = parseFloat(formatAmount);
  const numberOfDecimals = countDecimalPlaces(formatAmountToNumber);
  const currencyFormatted = new Intl.NumberFormat(format).format(
    formatAmountToNumber
  );
  return `${currencyFormatted}${numberOfDecimals === 0 ? ".00" : ""}`;
}

export function currencyToNumber(amountStr: string): number {
  const formatAmount = amountStr.replace(/,/g, "");
  return parseFloat(formatAmount);
}

export function countDecimalPlaces(value: number) {
  if (Math.floor(value) === value) return 0;
  return value.toString().split(".")[1].length || 0;
}

export const mergeAmount = <T, U>(integer: T, fractional: U) =>
  parseFloat(`${integer}.${fractional}`);
