import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { AppError } from '../shared/AppError';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;

  if (!header) {
    throw new AppError('Token não fornecido', 401);
  }

  const token = header.replace('Bearer ', '');

  try {
    const payload = jwt.verify(token, env.jwtSecret) as { id: string };
    req.user = { id: payload.id };
    next();
  } catch {
    throw new AppError('Token inválido', 401);
  }
}
