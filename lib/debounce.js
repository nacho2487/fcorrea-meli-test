/**
 * Ensures that only one event can be registered
 * within the space of a given time (usually milliseconds).
 *
 * Taken from: http://davidwalsh.name/javascript-debounce-function
 * Original by: https://underscorejs.org/
 *
 * @param {function} func
 * @param {number} wait
 * @param {boolean} immediate
 */
function debounce(func, wait, immediate) {
  let timeout;
  return () => {
    const context = this;
    const args = arguments;

    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;
    clearTimeout(timeout);

    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

module.exports = debounce;
