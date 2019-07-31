const express = require("express");
const mongoose = require("mongoose");
const router = require("./api/routes/router.js");

mongoose.connect("mongodb://admin:password@localhost:27017/admin", function(
  err
) {
  if (err) throw err;
  console.log("Successfully connected");
});

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/", router);

app.use(errorHandler);

function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send(err.msg);
}

app.listen(3000);
