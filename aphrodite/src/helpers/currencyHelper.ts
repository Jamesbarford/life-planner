export enum CurrencySymbols {
  sterling = "£",
  usd = "$",
  euro = "€"
}

/**
 *
 * @param format string representing country i.e `en-GB`
 * @param amount monetry value as a number
 * @returns string
 * @example
 * currencyFormatter("en-GB", 2000);
 * => "£2,000";
 */
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

/**
 *
 * @param amountStr money as a string: "£2,000"
 * @returns number
 * @example
 * currencyToNumber("£2,000");
 * => 2000;
 */
export function currencyToNumber(amountStr: string): number {
  const formatAmount = amountStr.replace(/([£,])/g, "");
  return parseFloat(formatAmount);
}

/**
 * @param integer the number before decimal place
 * @param fractional the number after decimal
 * @returns number
 * @example
 * mergeAmount(2000, 20);
 * => 2000.20;
 */
export const mergeAmount = <T, U>(integer: T, fractional: U): number =>
  parseFloat(`${integer}.${fractional}`);
