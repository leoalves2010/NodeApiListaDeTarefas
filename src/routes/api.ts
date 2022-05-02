import { Router } from 'express';

import * as taskController from '../controllers/taskController';

const router = Router();

router.get('/tasks', taskController.getAllTasks);
router.post('/task', taskController.createTask);
router.get('/task/:id', taskController.getOneTask);
router.put('/task/:id', taskController.updateTask);
router.delete('/task/:id', taskController.deleteTask);

export default router;