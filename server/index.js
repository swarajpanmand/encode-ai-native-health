import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI client with Thesys C1 API
const client = new OpenAI({
    apiKey: process.env.THESYS_API_KEY,
    baseURL: 'https://api.thesys.dev/v1/embed'
});

// In-memory conversation storage (for demo - use database in production)
const conversations = new Map();

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'C1 Chat Server is running' });
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { message, conversationId = 'default', history = [] } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Get or create conversation history
        let conversationHistory = conversations.get(conversationId) || [
            { role: 'system', content: 'You are a helpful AI assistant that generates interactive UI components.' }
        ];

        // Add user message to history
        conversationHistory.push({ role: 'user', content: message });

        // Call C1 API
        const completion = await client.chat.completions.create({
            model: 'c1/anthropic/claude-sonnet-4/v-20251230',
            messages: conversationHistory,
        });

        const assistantResponse = completion.choices[0].message;

        // Add assistant response to history
        conversationHistory.push(assistantResponse);

        // Store updated conversation
        conversations.set(conversationId, conversationHistory);

        // Return response
        res.json({
            response: assistantResponse.content,
            conversationId,
            messageCount: conversationHistory.length
        });

    } catch (error) {
        console.error('Error calling C1 API:', error);
        res.status(500).json({
            error: 'Failed to process chat request',
            details: error.message
        });
    }
});

// Clear conversation endpoint
app.delete('/api/chat/:conversationId', (req, res) => {
    const { conversationId } = req.params;
    conversations.delete(conversationId);
    res.json({ message: 'Conversation cleared', conversationId });
});

// Start server
app.listen(PORT, () => {
    console.log(` C1 Chat Server running on http://localhost:${PORT}`);
    console.log(` Health check: http://localhost:${PORT}/health`);
    console.log(` Chat endpoint: http://localhost:${PORT}/api/chat`);
});
