import { Router, Request, Response } from 'express';
import Todo from '../models/Todo';
import authenticateToken from '../middleware/authMiddleware';

interface AuthenticatedRequest extends Request {
    user?: {
        id: number;
        fullName: string;
        email: string;
    };
}

const router = Router();

router.post('/todos', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { title, description, completed } = req.body;
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const newTodo = await Todo.create({
            title,
            description,
            completed,
            userId,
        });

        res.status(201).json(newTodo);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/todos', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const todos = await Todo.findAll({ where: { userId } });

        res.status(200).json(todos);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/todos/:id', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const todo = await Todo.findOne({ where: { id: req.params.id, userId } });

        if (todo) {
            res.status(200).json(todo);
        } else {
            res.status(404).json({ message: 'Todo not found' });
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/todos/:id', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const [updated] = await Todo.update(req.body, {
            where: { id: req.params.id, userId }
        });

        if (updated) {
            const updatedTodo = await Todo.findOne({ where: { id: req.params.id, userId } });
            res.status(200).json(updatedTodo);
        } else {
            res.status(404).json({ message: 'Todo not found' });
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/todos/:id', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const deleted = await Todo.destroy({
            where: { id: req.params.id, userId }
        });

        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Todo not found' });
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

router.patch('/todos/:id/completed', async (req, res) => {
    const { id } = req.params;

    try {
        const todo = await Todo.findByPk(id);

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        todo.completed = true;
        await todo.save();

        res.json(todo);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

export default router;
