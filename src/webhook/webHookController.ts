import { NextFunction, Request, Response } from 'express';
import { sendMessageToMainService } from './webHookService';
import { BadDataError, InternalServerError } from '../types/errorTypes';
import { errorValidator } from '../utils/errorHandler';

export const webhookHandler = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
	try {
		const id = req.body?.message?.from?.id;
		const text = req.body?.message?.text;

		if (typeof id !== 'number' ||
			!Number.isFinite(id) ||
			typeof text !== 'string' ||
			text.trim().length === 0) {
			throw new BadDataError();
		}

		await sendMessageToMainService(req.body.message.from.id, req.body.message.text);
		return res.sendStatus(200);
	} catch (error: any) {
		return next(errorValidator(error, new InternalServerError('Error sending message via instanceApi')));
	}
};
