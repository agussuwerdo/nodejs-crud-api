import { Router } from 'express';
import { getItems, createItem, updateItem, deleteItem, login } from './handler';
import { authMiddleware } from './middleware';

const router = Router();

router.post('/login', login);
router.get('/items', authMiddleware, getItems);
router.post('/items', authMiddleware, createItem);
router.put('/items/:id', authMiddleware, updateItem);
router.delete('/items/:id', authMiddleware, deleteItem);

export default router;
