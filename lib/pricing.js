export const currencify = currency => (currency === "USD" ? "U$S" : "$");
export const formatDecimal = number => (number < 10 ? "0" : "") + number;
export const formatAmount = number =>
  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
