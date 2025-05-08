import app from './app';
import dotenv from 'dotenv';
import { setWebhook } from './webhook/webHookService';
import { EnvironmentVariableError } from './types/errorTypes';
import { errorHandler } from './utils/errorHandler';

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;
const WEBHOOK_URL = String(process.env.WEBHOOK_URL);
const BOT_TOKEN = String(process.env.BOT_TOKEN);
if (!BOT_TOKEN || !WEBHOOK_URL) errorHandler(new EnvironmentVariableError('BOT_TOKEN, WEBHOOK_URL is required'));
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

app.listen(PORT, () => {
	console.log(`Server running on port: ${PORT}`);
	setWebhook(WEBHOOK_URL, TELEGRAM_API);
});
