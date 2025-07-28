const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const {
  getTodos,
  addTodo,
  deleteTodo,
  toggleCompleted
} = require('../controllers/todoControllers');

router.get('/', protect, getTodos);
router.post('/', protect, addTodo);

router.delete('/:id', protect, deleteTodo);
router.patch('/:id/toggle-completed', protect, toggleCompleted);
module.exports = router;
