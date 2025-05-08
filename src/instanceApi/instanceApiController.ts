import { NextFunction, Request, Response } from 'express';
import { sendMessageToTelegram } from './instanceaApiService';
import { errorValidator } from '../utils/errorHandler';
import { BadDataError, InternalServerError } from '../types/errorTypes';

export const instanceApiHandler = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
	try {
		const { chatId, message } = req.body;

		if (
			typeof chatId !== 'number' ||
			!Number.isFinite(chatId) ||
			typeof message !== 'string' ||
			message.trim().length === 0
		) {
			throw new BadDataError();
		}
		await sendMessageToTelegram(chatId, message);
		return res.status(200).json({ success: true });
	} catch (error: any) {
		return next(errorValidator(error, new InternalServerError('Error sending message via telegramApi')));
	}
};
