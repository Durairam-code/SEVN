const Task = require("../models/Task");
const { put } = require("../routes/TaskRoute");

module.exports = {
  //Get All Tasks
  async view(req, res) {
    await Task.findAll()
      .then((tasks) => {
        res.json(tasks);
      })
      .catch((err) => {
        res.send("error:" + err);
      });
  },

  //Add New Task
  async create(req, res) {
    const today = await new Date();
    const newTask = {
      name: req.body.name,
      createdAt: today,
    };
    if (!req.body.name) {
      res.staus(400);
      res.json({ error: "Enter Valid Data" });
    } else {
      await Task.create(newTask)
        .then(() => {
          res.send("Task added");
        })
        .catch((err) => {
          res.send("Error:" + err);
        });
    }
  },

  //Delete Task By ID
  async delete(req, res) {
    if (!req.params.id) {
      res.staus(400);
      res.json({ error: "Unable to find id" });
    } else {
      await Task.destroy({
        where: {
          id: req.params.id,
        },
      })
        .then(() => {
          res.send("Task Deleted");
        })
        .catch((err) => {
          res.send("error:" + err);
        });
    }
  },

  //Update Task By ID
  async update(req, res) {
    const today = await new Date();
    const editTask = {
      name: req.body.name,
      updatedAt: today,
    };
    if (!req.params.id) {
      res.staus(400);
      res.json({ error: "Unable to find id" });
      if (!req.body.name) {
        res.staus(400);
        res.json({ error: "Enter Valid Data" });
      }
    } else {
      await Task.update(editTask, { where: { id: req.params.id } })
        .then(() => {
          res.send("Task Updated");
        })
        .catch((err) => {
          res.send("error:" + err);
        });
    }
  },
};
