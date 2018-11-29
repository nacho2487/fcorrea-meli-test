/**
 * Returns the value of a given parameter
 * from the query string.
 *
 * Example:
 *     Given a url `https://mercadolibre.com/seatch?q=something`
 *     and a `getQuerystringValue('q')`, it will return 'something'.
 *
 *     In case you're on the server, you may provide an already
 *     known value like `getQuerystringValue('q', 'something else')`,
 *     it will return 'something else'.
 *
 * @param {string} param
 * @param {string} serverValue
 */
function getQuerystringValue(param, serverValue) {
  // If we are on the server, we already have this value.
  if (serverValue) return serverValue;

  const url = window.location.href;
  const name = param.replace(/[\[\]]/g, "\\$&");

  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
  const results = regex.exec(url);

  if (!results) return null;
  if (!results[2]) return "";

  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

module.exports = getQuerystringValue;
