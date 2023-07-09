const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const router = require("./routers/router.js");
const port = 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
console.log(process.env.connectionString);

mongoose
  .connect(process.env.connectionString)
  .then(() => {
    console.log("connected to db successfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/", router);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
