import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        fullName: string;
        email: string;
      };
    }
  }
}
