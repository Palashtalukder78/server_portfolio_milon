//external import
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");

//internal import
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorHandler");
const loginRouter = require("./router/loginRouter");
const projectsRouter = require("./router/projectsRouter");

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
app.use("/", loginRouter);
app.use("/projects", projectsRouter);

//404 not found
app.use(notFoundHandler);
//common error handler
app.use(errorHandler);

//listening app
app.listen(process.env.PORT, () => {
  console.log(`The portfolio-app listening on port ${process.env.PORT}`);
});
