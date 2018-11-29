/**
 * It returns a function that
 * proxies a simple next route.
 *
 * Example:
 *    GET /items will render the pages/items.js page
 *    as Next would normally do.
 *
 * Usage:
 *    const proxyToNext = nextProxyBuilder(app, server);
 *    proxyToNext('/');
 *
 *    // This will register a route in path '/' to point to
 *    // that will point to Next's server '/' route (pages/index.js)
 *
 * @param {Next.App} app
 * @param {Express.Server} server
 */
const nextProxyBuilder = (app, server) => route => (req, res) =>
  server.get(route, app.render(req, res, route, req.query));

module.exports = { nextProxyBuilder };
