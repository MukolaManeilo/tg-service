import { NextFunction, Request, Response } from 'express';
import { sendMessageToMainService } from './webHookService';
import { BadDataError, InternalServerError } from '../types/errorTypes';
import { errorValidator } from '../utils/errorHandler';

export const webhookHandler = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
	try {
		if (
			typeof req.body?.message?.from?.id !== 'number' ||
			req.body.message.from.id.trim().length === 0 ||
			typeof req.body.message.text !== 'string' ||
			req.body.message.text.trim().length === 0
		) {
			throw new BadDataError();
		}

		await sendMessageToMainService(req.body.message.from.id, req.body.message.text);
		return res.sendStatus(200);
	} catch (error: any) {
		return next(errorValidator(error, new InternalServerError('Error sending message via instanceApi')));
	}
};
