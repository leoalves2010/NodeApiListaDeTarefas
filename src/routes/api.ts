import { Router } from 'express';

import * as todoController from '../controllers/todoController';

const router = Router();

router.get('/todos', todoController.getAllTodos);
router.post('/todo', todoController.createTodo);
router.get('/todo/:id', todoController.getOneTodo);
router.put('/todo/:id', todoController.updateTodo);
router.delete('/todo/:id', todoController.deleteTodo);

export default router;