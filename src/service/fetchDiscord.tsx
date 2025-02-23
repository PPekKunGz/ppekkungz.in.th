const DISCORD_API_URL = 'https://discord.com/api/v9';
const BOT_TOKEN = 'YOUR_BOT_TOKEN_HERE';

export async function fetchMessagesFromChannel(channelId: string) {
    try {
        const response = await fetch(`${DISCORD_API_URL}/channels/${channelId}/messages`, {
            headers: {
                Authorization: `Bot ${BOT_TOKEN}`
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching messages from Discord channel:', error);
        throw error;
    }
}

export default fetchMessagesFromChannel;