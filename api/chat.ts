import OpenAI from 'openai';
import { VercelRequest, VercelResponse } from '@vercel/node'; // Vercel の型

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Vercel の環境変数から取得
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { messages } = req.body; // フロントエンドから送信されたメッセージの配列

    if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: 'Invalid request body' });
    }

    try {
        const chatCompletion = await openai.chat.completions.create({
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' }, // システムプロンプト (必要に応じて)
                ...messages, // フロントエンドから送信されたメッセージ
            ],
            model: 'gpt-4o', // または使用したいモデル
        });

        const responseMessage = chatCompletion.choices[0].message.content;

        return res.status(200).json({ message: responseMessage });
    } catch (error) {
        console.error('OpenAI API error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}