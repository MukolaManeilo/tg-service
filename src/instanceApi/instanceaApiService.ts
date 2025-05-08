import { bot } from '../configs/bot';

export const sendMessageToTelegram = async (chatId: number | string, message: string): Promise<void> => {
	await bot.telegram.sendMessage(chatId, message);
};
