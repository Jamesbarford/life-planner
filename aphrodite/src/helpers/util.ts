import { ApplicationState } from "../App/types";

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
export function removeWhiteSpace(str: string): string {
  if (!isString(str)) return str;
  return str.replace(/\s/g, "");
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
export function isString<T>(str: T): boolean {
  return toString.call(str) === "[object String]";
}

/**
 *
 * @param classes array of string, css class names to join
 * @returns string
 * @example
 * classNames(["navigation", "selected"]);
 * => "navigation selected"
 */
export function classNames(classes: Array<string>): string {
  return classes.join(" ").trim();
}

/**
 *
 * @param obj an object
 * @returns boolean
 * @example
 * const obj = {};
 * isEmptyObject(obj);
 * => true
 */
export function isEmptyObject(obj: object): boolean {
  return Object.keys(obj).length > 1;
}

export const isOfTypeNumber = <T>(value: T): boolean => isNaN(Number(value));
