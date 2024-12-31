const Project = require("../model/project");

//Get projects data
function getProjects(req, res, next) {
  res.json({
    title: "Kasem project",
    address: "Mahmudpur west",
    budgets: "1006",
  });
}
async function getProjects(req, res, next) {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    next(err);
  }
}

// Add Project
async function addProject(req, res, next) {
  console.log("Request Body:", req.body);

  // Create a new project object with the request data
  const newProject = new Project({
    ...req.body,
  });

  // Save the project or handle errors
  try {
    const result = await newProject.save();
    res.status(201).json({
      message: "প্রজেক্ট সফলভাবে যোগ করা হয়েছে।", // Response in Bangla
      projectId: result._id, // Optionally return the created project ID
    });
  } catch (error) {
    console.error("Error adding project:", error); // Log the error for debugging
    res.status(500).json({
      errors: {
        common: {
          msg: "অজানা একটি ত্রুটি ঘটেছে।", // Error message in Bangla
        },
      },
    });
  }
}

module.exports = { getProjects, addProject };
