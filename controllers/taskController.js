const Task = require("../models/Task");

/* ================= GET ALL TASKS ================= */
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks); // ✅ OLD STYLE
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= CREATE TASK ================= */
exports.createTask = async (req, res) => {
  try {
    const task = new Task({
      text: req.body.text,
    });
    await task.save();
    res.json(task); // ✅ OLD STYLE
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= DELETE TASK ================= */
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ deleted: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= UPDATE TASK (GENERAL) ================= */
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(task); // ✅ OLD STYLE
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= TOGGLE COMPLETE ================= */
exports.toggleTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    task.completed = !task.completed;
    await task.save();
    res.json(task); // ✅ OLD STYLE
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= TOGGLE IMPORTANT ================= */
exports.toggleImportant = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    task.important = !task.important;
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= TOGGLE MY DAY ================= */
exports.toggleMyDay = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    task.myDay = !task.myDay;
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= SUBTASKS ================= */
exports.addSubtask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    task.subtasks.push({ text: req.body.text });
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.toggleSubtask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    const sub = task.subtasks.id(req.params.subId);
    sub.completed = !sub.completed;
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteSubtask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    task.subtasks.id(req.params.subId).remove();
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
