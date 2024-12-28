//external import
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();
dotenv.config();

//Database connection
mongoose
  .connect(process.env.MONGO_CONNECTION_SRTING)
  .then(console.log("Database connection successfully"))
  .catch((err) => console.log(err));

//Request parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//set Static Folder
app.use(express.static(path.join(__dirname, "public")));

//parser cookie
app.use(cookieParser(process.env.COOKIE_SECRET));

//Routing Setup

//404 not found
//....
//common error handler
//....

//listening app
app.listen(process.env.PORT, () => {
  console.log(`The portfolio-app listening on port ${process.env.PORT}`);
});
