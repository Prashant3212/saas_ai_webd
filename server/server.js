import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Hugging Face Configuration
const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;
const HF_MODEL_URL = 'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0';

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Backend server is running' });
});

// Image generation endpoint
app.post('/api/generate-image', async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        if (!HF_API_KEY || HF_API_KEY === 'your_token_here') {
            return res.status(500).json({
                error: 'Hugging Face API key not configured. Please add HUGGINGFACE_API_KEY to server/.env file'
            });
        }

        console.log('Generating image for prompt:', prompt);

        // Call Hugging Face API
        const response = await fetch(HF_MODEL_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${HF_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                inputs: prompt,
                options: {
                    wait_for_model: true,
                },
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('HF API Error:', errorText);

            if (response.status === 401) {
                return res.status(401).json({ error: 'Invalid Hugging Face API key' });
            }

            if (response.status === 503) {
                return res.status(503).json({
                    error: 'Model is loading. Please wait 20 seconds and try again.'
                });
            }

            return res.status(response.status).json({
                error: `API error: ${response.statusText}`
            });
        }

        // Get image blob
        const imageBuffer = await response.buffer();

        // Convert to base64
        const base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`;

        res.json({
            success: true,
            imageUrl: base64Image,
        });

    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({
            error: error.message || 'Internal server error'
        });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Backend server running on http://localhost:${PORT}`);
    console.log(`📝 API endpoint: http://localhost:${PORT}/api/generate-image`);
    if (!HF_API_KEY || HF_API_KEY === 'your_token_here') {
        console.warn('⚠️  WARNING: Hugging Face API key not configured!');
        console.warn('   Please add HUGGINGFACE_API_KEY to server/.env file');
    }
});
