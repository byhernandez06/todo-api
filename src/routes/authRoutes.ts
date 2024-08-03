import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const router = Router();

router.post('/register', async (req: Request, res: Response) => {
    try {
        console.log('req.body')
        const { fullName, email, password } = req.body;

        const isEmailAlreadyExist = await User.findOne({ where: { email } });
        if (isEmailAlreadyExist) {
            return res.status(400).json({
                status: 400,
                message: 'Email already in use',
            });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword,
        });

        const token = jwt.sign({ id: newUser.id, email: newUser.email }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

        res.status(201).json({
            status: 201,
            success: true,
            message: 'User created successfully',
            user: newUser,
            token,
        });
    } catch (error: any) {
        console.error(error);
        res.status(400).json({
            status: 400,
            message: error.message.toString(),
        });
    }
});

router.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const isUserExist = await User.findOne({ where: { email } });
        if (!isUserExist) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'User not found',
            });
        }

        const isPasswordMatched = await bcrypt.compare(password, isUserExist.password);
        if (!isPasswordMatched) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: 'Wrong password',
            });
        }

        const token = jwt.sign(
            { id: isUserExist.id, fullName: isUserExist.fullName, email: isUserExist.email },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            status: 200,
            success: true,
            message: 'Login success',
            token,
        });
    } catch (error: any) {
        console.error(error);
        res.status(400).json({
            status: 400,
            message: error.message.toString(),
        });
    }
});

router.get('/validate', async (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            status: 401,
            success: false,
            message: 'No token provided',
        });
    }

    try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

        const user = await User.findByPk(decoded.id);

        if (!user) {
            return res.status(401).json({
                status: 401,
                success: false,
                message: 'Invalid token',
            });
        }

        const newToken = jwt.sign(
            { id: user.id, fullName: user.fullName, email: user.email },
            process.env.JWT_SECRET as string,
            { expiresIn: '1d' }
        );

        return res.json({
            status: 200,
            success: true,
            message: 'Token validated',
            token: newToken,
        });

    } catch (error) {
        return res.status(401).json({
            status: 401,
            success: false,
            message: 'Invalid token',
        });
    }
});

export default router;
