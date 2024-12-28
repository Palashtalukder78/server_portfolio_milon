const express = require("express");
const getProjects = require("../controller/projectsController");

const router = express.Router();

//login page
router.get("/", getProjects);

module.exports = router;
