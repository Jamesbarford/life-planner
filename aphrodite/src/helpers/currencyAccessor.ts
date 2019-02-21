export const enum CurrencySymbols {
  sterling = "£",
  usd = "$",
  euro = "€"
}

export class CurrencyAccessor {
  /**
   * returns a string as currency,
   */
  public static format(format: string, amount: string): string {
    if (!amount) return "£0";
    const formatAmount = amount.replace(/,/g, "");
    const formatAmountToNumber = parseFloat(formatAmount);
    const currencyFormatted = new Intl.NumberFormat(format).format(
      formatAmountToNumber
    );
    return `${CurrencySymbols.sterling}${currencyFormatted}`;
  }

  public static toNumber(amountStr: string): number {
    return parseFloat(amountStr.replace(/([£,])/g, ""));
  }

  /**
   * merge integer with fractional to return float
   */
  public static mergeAmount<T, U>(integer: T, fractional: U): number {
    return parseFloat(`${integer}.${fractional}`);
  }

  public static splitAmount(amount: number): Array<string> {
    return `${amount}`.split(".");
  }
}
