import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { setWebhook } from './webhook/webHookService';

dotenv.config();
const app = express();
app.use(express.json());

const PORT = Number(process.env.PORT) || 3000;
const BOT_TOKEN = process.env.BOT_TOKEN;
const WEBHOOK_URL = process.env.WEBHOOK_URL;
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

app.post('/webhook', (req: Request, res: Response) => {
	const message = req.body.message;

	if (message?.text) {
		console.log(`Received: ${message.text}`);
		fetch(`${TELEGRAM_API}/sendMessage`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				chat_id: message.chat.id,
				text: `Received: ${message.text}`,
			}),
		}).catch((err) => console.error('❌ Error sending message:', err));
	}
	res.sendStatus(200);
});

app.listen(PORT, () => {
	console.log(`Server running on port: ${PORT}`);
	if (WEBHOOK_URL && TELEGRAM_API) {
		setWebhook(WEBHOOK_URL, TELEGRAM_API);
	} else {
		console.error('.env param empty');
	}
});
