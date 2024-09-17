import { Request, Response, NextFunction } from 'express';

export type Route = {
    method: string;
    path: string;
    handler: (_req: Request, res: Response, _next: NextFunction) => Promise<unknown>;
    isAuthenticated: boolean;
};