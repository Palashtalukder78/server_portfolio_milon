const express = require("express");
const { getProjects, addProject } = require("../controller/projectsController");
const {
  addProjectValidator,
  addProjectValidationHandler,
} = require("../middlewares/projects/projectsValidator");

const router = express.Router();

//get page
router.get("/", getProjects);

//Add Project page
router.post("/", addProjectValidator, addProjectValidationHandler, addProject);

module.exports = router;
