/**
 *
 * @param string - string
 * @returns {*} removes all whitespace from a string
 * @example
 * const str = "s t r ing   "
 * const noWhiteSpace = removeWhiteSpace(str);
 * => // noWhiteSpace === "string"
 *
 */
export function removeWhiteSpace(string: string): string {
	if (!isString(string)) return string;
	return string.replace(/\s/g, "");
}

/**
 *
 * @param string the value to be evaluated
 * @returns boolean
 * @example
 * const str = "hello";
 * const num = 2;
 * isString(str) // true;
 * isString(num) // false;
 */
export function isString(string: any): boolean {
	return toString.call(string) === "[object String]";
}
