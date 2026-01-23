
import type { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

interface EnhancedError extends Error{
  status?: number;
  statusCode?: number;
}

export const errorHandler: ErrorRequestHandler = ((err: EnhancedError, req: Request, res: Response, next)=> {
  console.error(err.stack);

  const status = err.status || err.statusCode || 500;
  res.status(status).json({
    error: status >= 500 ? "Internal Server Error": err.message,
    logId: Date.now()
  });
});

export const asyncHandler = (fn: Function) => {
  return(req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// might need to go over asyncHandler