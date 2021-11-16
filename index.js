const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv/config");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
//Routes
const categoriesRoutes = require("./routes/categories");
const productsRoutes = require("./routes/products");
const usersRoutes = require("./routes/users");
const ordersRoutes = require("./routes/orders");
app.use(cors());
app.options("*", cors());
//////////////////////////// Middlewares

app.use(bodyParser.json());
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  {
    flags: "a",
  }
);

app.use(morgan("combined", { stream: accessLogStream }));
////////////////////////////Middlewares

const port = process.env.PORT;

const API_URL = process.env.API_URL;

app.get("/", (req, res) => {
  res.send("Hello Worldasssa!");
});
app.use(`${API_URL}/categories`, categoriesRoutes);
app.use(`${API_URL}/products`, productsRoutes);
app.use(`${API_URL}/users`, usersRoutes);
app.use(`${API_URL}/orders`, ordersRoutes);

mongoose
  .connect(process.env.DB_CONNECTION_STRING)
  .then(() => {
    console.log("Database is ready");
  })
  .catch(() => {
    console.log(error);
  });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
