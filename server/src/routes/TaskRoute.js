const tasks = require("express").Router();
const cors = require("cors");
const TaskController = require("../controllers/TaskController");

tasks.use(cors());

tasks.post("/create", TaskController.create);

tasks.get("/view", TaskController.view);

tasks.put("/update/:id", TaskController.update);

tasks.delete("/delete/:id", TaskController.delete);

module.exports = tasks;
