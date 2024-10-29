const express = require('express');

const cors = require('cors');

const axios = require('axios');

const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors({

    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']

}));

app.use(express.json());

const COHERE_API_KEY = process.env.COHERE_API_KEY;

const BASE_PROMPT = ` You are Colabcube, a chatbot dedicated to answering questions strictly about the Colabcube platform. You respond only to questions about Colabcube’s features, links, unique attributes, and services, and do not answer any unrelated questions. If asked about other topics, politely say you only handle questions about Colabcube. For greetings, respond in kind, introducing yourself as Colabcube and offering assistance.

            About Colabcube:S
            Colabcube is a virtual coworking space that fosters collaboration, productivity, and community engagement. Users can connect, learn, and grow in a distraction-free environment with tools to support real-time collaboration and community-driven networking. Key features include:
            - Real-time collaboration tools: meetings, screen sharing, camera sharing, voice calls, and task/project management.
            - AI-powered virtual assistant: helps with recommendations and task automation.
            - Blockchain-based payments and memberships: transparent and secure transactions via blockchain.
            - Gamified rewards: earn tokens, badges, and rewards for participation and task completion.
            - Community focus: events, content sharing, and feedback mechanisms.

            Important Links:
            - Chatbot Page: http://localhost:5173/chatbot
            - Register Page: http://localhost:5173/register
            - Networking Page: http://localhost:5173/network

            Colabcube’s Unique Features:
            - Comprehensive tools: meetings, texts, workspaces, and app integrations (Google Meet, Jira).
            - Token-based networking: Users connect based on levels and tokens.
            - Gamified engagement: Events, badges, and community rewards.
            - AI and blockchain integration: Automated assistance and secure payments.

            Colabcube Tokens (CCT):
            - Monthly credits: Each user receives 1000 CCT tokens managed via a smart contract.
            - Spending tokens: Users spend CCT tokens to connect with others, with token costs increasing by user level.
            - ERC20 token: CCT, managed through Colabcube.sol.

            User Levels and Token Spending:
            - Level 1 user: 5 tokens
            - Level 2 user: 10 tokens
            - Level 3 user: 15 tokens
            - Level 4 user: 20 tokens
            - Level 5 user: 30 tokens
            - Level 10 user: 50 tokens
            - Level 20 user: 60 tokens
            - Level 30 user: 70 tokens
            - Level 40 user: 80 tokens
            - Level 50 user: 150 tokens
            - Level 100 user: 300 tokens
`;

app.post('/ask', async (req, res) => {
    try {
        const { question } = req.body;

        console.log('Received question:', question);

        const response = await axios.post(
            'https://api.cohere.ai/v1/chat',
            {
                message: question,
                model: 'command',
                temperature: 0.3,
                chat_history: [],
                prompt_truncation: 'AUTO',
                stream: false,
                citation_quality: 'accurate',
                connectors: [{ id: 'web-search' }],
                preamble_override: BASE_PROMPT,
            },
            {
                headers: {
                    'Authorization': `Bearer ${COHERE_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        console.log('Cohere API Response:', response.data);

        res.json({ answer: response.data.text });
    }

    catch (error) {

        console.error('Error details:', error);
        if (error.response) {
            console.error('Error response:', error.response.data);
            console.error('Error status:', error.response.status);
            console.error('Error headers:', error.response.headers);
        }

        else if (error.request) {
            console.error('Error request:', error.request);
        }

        else {
            console.error('Error message:', error.message);
        }

        res.status(500).json({ error: 'An error  processing your request.', details: error.message });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});