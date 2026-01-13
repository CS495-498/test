const express = require("express");
const app = express();

app.get("/health", (req, res) => {
  res.status(200).json({ ok: true });
});

app.get("/", (req, res) => {
  res.status(200).send("CS498 CI/CD demo app is running.");
});

module.exports = app;
