const express = require("express");
const router = express.Router();
const Todo = require("../models/todoModel");
const mongoose = require("mongoose");
// GET all todos
router.get("/todos", async (req, res) => {
  try {
    const todo_list = await Todo.find();
    res.json(todo_list);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST a new todo
router.post("/todos", async (req, res) => {
  try {
    const { todo, isCompleted } = req.body;

    if (!todo) {
      return res.status(400).json({ error: "Todo property is missing" });
    }

    const create_todo = await Todo.create({ todo, isCompleted });

    res.json({ create_todo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE a todo
router.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "ID is missing" });
    }

    const delete_todo = await Todo.findByIdAndDelete(id);

    if (!delete_todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json({ message: "Todo deleted successfully", delete_todo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
