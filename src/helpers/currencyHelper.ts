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
  const currencyFormatted = new Intl.NumberFormat(format).format(
    formatAmountToNumber
  );
  return `${CurrencySymbols.sterling}${currencyFormatted}`;
}

export function currencyToNumber(amountStr: string): number {
  const formatAmount = amountStr.replace(/,/g, "");
  return parseFloat(formatAmount);
}

export const mergeAmount = <T, U>(integer: T, fractional: U): number =>
  parseFloat(`${integer}.${fractional}`);
