import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Define the type for the request with user property
interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    fullName: string;
    email: string;
  };
}

const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user as {
      id: number;
      fullName: string;
      email: string;
    };
    next();
  });
};

export default authenticateToken;
