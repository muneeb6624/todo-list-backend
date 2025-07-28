const { Todo } = require('../../database/models/Todo');

const getTodos = async (req, res) => {
  const todos = await Todo.find({ user: req.user._id }).sort('-createdAt');
  res.json(todos);
};

const addTodo = async (req, res) => {
  const { title, description, completed } = req.body;
  const todo = await Todo.create({
    user: req.user._id,
    title,
    description,
    completed,
  });
  res.status(201).json(todo);
};

const deleteTodo = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo || todo.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  await todo.deleteOne();
  res.json({ message: 'Todo deleted' });
};

// server/api/controllers/todoControllers.js


const toggleCompleted = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    todo.completed = !todo.completed;
    await todo.save();
    res.json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error toggling completion' });
  }
};

module.exports = { getTodos, addTodo, deleteTodo, toggleCompleted };
