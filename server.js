require("dotenv").config();

const express = require("express");
const next = require("next");
const compression = require("compression");
const { nextProxyBuilder } = require("./lib/next-proxy");
import MercadoLibreAPI from "./lib/meli";

const port = parseInt(process.env.PORT, 10) || 5000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  if (!dev) server.use(compression());

  const proxyToNext = nextProxyBuilder(app, server);
  const meli = new MercadoLibreAPI(process.env.SITE);

  // View routes

  proxyToNext("/");
  proxyToNext("/items");

  server.get("/items/:id", (req, res) =>
    app.render(req, res, "/item", { id: req.params.id })
  );

  // API routes

  server.get("/api/items", (req, res) =>
    meli.getSearchResults(req.query.q).then(response => {
      res.json(response);
    })
  );

  server.get("/api/items/:id", (req, res) =>
    meli.getItem(req.params.id).then(response => {
      res.json(response);
    })
  );

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Listo en http://localhost:${port}`);
  });
});
