import express from 'express';
import { createTodo, deleteTodo, getTodo, getTodos, updateTodo } from '../controllers/todo.controllers.js';

const router = express.Router();

router.get('/todos', getTodos);
router.get('/todo/:id', getTodo);
router.post('/addtodo', createTodo);
router.delete('/delete/:id', deleteTodo);
router.patch('/update/:id', updateTodo);

export default router;