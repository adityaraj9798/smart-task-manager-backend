const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

/**
 * 🛠️ CORE CRUD OPERATIONS
 */

// GET all tasks - Used to populate your list on refresh
router.get("/", taskController.getTasks);

// POST new task - This is where your "Add Task" logic hits
router.post("/", taskController.createTask);

// DELETE task - Removes task by MongoDB ID
router.delete("/:id", taskController.deleteTask);

/**
 * 🔄 UPDATE OPERATIONS
 * Handles Title, Category, Priority, Due Date, and Notes
 */
router.patch("/:id", taskController.updateTask);

/**
 * ✅ STATUS & TOGGLE OPERATIONS
 */

// Toggle Completion (Completed/Pending)
router.patch("/:id/toggle", taskController.toggleTask);

// Toggle Star/Important status
router.patch("/:id/important", taskController.toggleImportant);

// Toggle "My Day" status
router.patch("/:id/myday", taskController.toggleMyDay);

/**
 * 📝 SUBTASK OPERATIONS
 */

// Add a subtask to an existing task
router.post("/:id/subtasks", taskController.addSubtask);

// Toggle subtask completion
router.patch("/:id/subtasks/:subId", taskController.toggleSubtask);

// Remove a subtask
router.delete("/:id/subtasks/:subId", taskController.deleteSubtask);

module.exports = router;