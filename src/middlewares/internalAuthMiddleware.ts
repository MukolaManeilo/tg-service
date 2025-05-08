import { NextFunction, Request, Response } from 'express';
import { AccessDenial } from '../types/errorTypes';

export const internalAuth = (req: Request, res: Response, next: NextFunction): void => {
	const token = req.headers['x-api-key'];
	if (token !== process.env.INTERNAL_API_KEY)
		return next(new AccessDenial('HTTP header x-api-key is empty or invalid'));
	return next();
};
