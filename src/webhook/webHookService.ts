export const setWebhook = (webHookUrl: string, telegramUrl: string) => {
	fetch(`${telegramUrl}/setWebhook`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ url: webHookUrl + '/webhook' }),
	})
		.then((res) => res.json())
		.then((data) => {
			if (data.ok) {
				console.log('✅ Webhook set successfully');
			} else {
				console.error('❌ Failed to set webhook:', data);
			}
		})
		.catch((err) => {
			console.error('❌ Error setting webhook:', err);
		});
};

export const sendMessageToMainService = async (userId: number, prompt: string) => {};
