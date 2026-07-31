import { Request, Response, NextFunction } from 'express';
import { AppError } from '../shared/AppError';

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: [],
    });
    return;
  }

  console.error(err);
  res.status(500).json({
    success: false,
    message: 'Erro interno do servidor',
    errors: [],
  });
}
