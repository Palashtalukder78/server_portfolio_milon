//Get login data
function getLogin(req, res, next) {
  res.json({
    name: "Palash",
    email: "palashtalukder78@gmail.com",
    password: "123445password",
  });
}

module.exports = getLogin;
