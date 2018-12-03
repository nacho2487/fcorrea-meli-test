export const currencify = currency => (currency === "USD" ? "U$S" : "$");

/**
 * Formats the number of a price decimals
 * making sure it always has a two digits minimum.
 * @param {number} number
 */
export const formatDecimal = number => (number < 10 ? "0" : "") + number;

/**
 * Formats a number with the dot notation.
 *
 * For example:
 *  123456  => 123.456
 *  12345678 =>  12.345.678
 *
 * Mostly used for prices.
 *
 * @param {number} number
 */
export const formatAmount = number =>
  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
