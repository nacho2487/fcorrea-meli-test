require("dotenv").config();

const express = require("express");
const next = require("next");
const { nextProxyBuilder } = require("./lib/next-proxy");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const proxyToNext = nextProxyBuilder(app, server);

  // View routes

  proxyToNext("/");
  proxyToNext("/items");

  server.get("/items/:id", (req, res) =>
    app.render(req, res, "/item", { id: req.params.id })
  );

  // API routes

  server.get("/api/items", async (req, res) => {
    return {};
  });

  server.get("/api/items/:id", async (req, res) => {
    return {};
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Listo en http://localhost:${port}`);
  });
});
