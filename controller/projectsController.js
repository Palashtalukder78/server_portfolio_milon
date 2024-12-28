//Get projects data
function getProjects(req, res, next) {
  res.json({
    title: "Kasem project",
    address: "Mahmudpur west",
    budgets: "1006",
  });
}

module.exports = getProjects;
