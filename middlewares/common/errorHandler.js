const createError = require("http-errors");

//Not found handler
function notFoundHandler(req, res, next) {
  next(createError(404, "The requested content can not found!"));
}

//Default error handler
function errorHandler(err, req, res, next) {
  res.locals.error = process.env.development ? err : { message: err.message };
  res.status(err.status || 500);
  res.json(res.locals.error);
}

module.exports = {
  notFoundHandler,
  errorHandler,
};
