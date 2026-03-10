import express from 'express';
import cors from 'cors';
import axios from 'axios';
import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

if (!process.env.DATABASE_URL) {
    console.warn('WARNING: DATABASE_URL is not defined! Neon connection will fail.');
}

// Use Neon HTTP API for serverless connection
const sql = neon(process.env.DATABASE_URL || 'postgresql://placeholder');

app.use(cors());
app.use(express.json());

// Auth Handshake Validation
app.post('/api/auth/handshake', async (req, res) => {
    const { token } = req.body;
    console.log('Received handshake request for token:', token);

    if (!token) {
        return res.status(400).json({ error: 'Token is required' });
    }

    try {
        // Validate token with Mantracare API
        console.log('Validating token with Mantracare API...');
        const response = await axios.post('https://api.mantracare.com/user/user-info', { token });
        console.log('Mantracare API response:', response.data);

        if (response.data && response.data.user_id) {
            const { user_id } = response.data;
            console.log('Authentication successful for user_id:', user_id);

            // Auto-initialize user in the database (Idempotent)
            await sql`
        INSERT INTO users (user_id) 
        VALUES (${user_id}) 
        ON CONFLICT (user_id) DO NOTHING
      `;

            // Get current week start (Monday)
            const now = new Date();
            const day = now.getDay();
            const diff = now.getDate() - day + (day === 0 ? -6 : 1);
            const monday = new Date(now.setDate(diff));
            const week_start = monday.toISOString().split('T')[0];

            await sql`
        INSERT INTO progress (user_id, week_start) 
        VALUES (${user_id}, ${week_start}) 
        ON CONFLICT (user_id, week_start) DO NOTHING
      `;

            return res.json({ user_id });
        } else {
            console.error('Invalid response structure from Mantracare API:', response.data);
            return res.status(401).json({ error: 'Invalid token response' });
        }
    } catch (error: any) {
        console.error('Authentication Error details:', error.response?.data || error.message);
        return res.status(401).json({ error: 'Authentication failed' });
    }
});

// Get User Progress for a specific week
app.get('/api/progress/:user_id/:week_start', async (req, res) => {
    const { user_id, week_start } = req.params;
    console.log(`Fetching progress for ${user_id} on week ${week_start}`);

    try {
        const result = await sql`
      SELECT week_data FROM progress 
      WHERE user_id = ${user_id} AND week_start = ${week_start}
    `;

        if (result.length > 0) {
            return res.json({ week_data: result[0].week_data });
        } else {
            // Return default data if not found for this week
            return res.json({ week_data: [null, null, null, null, null, null, null] });
        }
    } catch (error) {
        console.error('Database Error:', error);
        return res.status(500).json({ error: 'Failed to fetch progress' });
    }
});

// Update User Progress
app.post('/api/progress', async (req, res) => {
    const { user_id, week_start, week_data } = req.body;

    if (!user_id || !week_start || !week_data) {
        return res.status(400).json({ error: 'Missing user_id, week_start or week_data' });
    }

    try {
        await sql`
      INSERT INTO progress (user_id, week_start, week_data, updated_at) 
      VALUES (${user_id}, ${week_start}, ${JSON.stringify(week_data)}, CURRENT_TIMESTAMP)
      ON CONFLICT (user_id, week_start) DO UPDATE SET 
        week_data = EXCLUDED.week_data,
        updated_at = EXCLUDED.updated_at
    `;
        return res.json({ success: true });
    } catch (error) {
        console.error('Database Update Error:', error);
        return res.status(500).json({ error: 'Failed to save progress' });
    }
});

app.listen(port, () => {
    console.log(`Backend server running on port ${port}`);
});
