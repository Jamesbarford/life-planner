import { isOfTypeNumber } from "./util";

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
  if (isOfTypeNumber(amount) === false) {
    const formatAmount = amount.substring(0, amount.length).replace(/,/g, "");
    const formatAmountToNumber = parseFloat(formatAmount);
    const currencyFormatted = new Intl.NumberFormat(format).format(
      formatAmountToNumber
    );
    return currencyFormatted;
  } else if (isOfTypeNumber(amount) === true) {
    const currencyFormatted = new Intl.NumberFormat(format).format(
      Number(amount)
    );
    return currencyFormatted;
  }
}

export function currencyToNumber(amountStr: string): number {
  const formatAmount = amountStr.replace(/,/g, "");
  return parseFloat(formatAmount);
}
