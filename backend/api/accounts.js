const express = require('express');
const router = express.Router();
const db = require('../db'); // Assuming db.js is set up for database queries
const roleCheck = require('../middleware/roleCheck');

// Endpoint to get all accounts for a user, optionally filtered by region
router.get('/', async (req, res) => {
    const userId = req.user.id; // Assuming user ID is available in req.user
    const { region } = req.query; // Get region from query parameters
    try {
        const query = region 
            ? 'SELECT * FROM amazon_accounts WHERE user_id = $1 AND region = $2' 
            : 'SELECT * FROM amazon_accounts WHERE user_id = $1';
        const params = region ? [userId, region] : [userId];
        const result = await db.query(query, params);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching accounts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to add a new account
router.post('/', roleCheck('admin'), async (req, res) => {
    const { account_name, region, access_token, refresh_token } = req.body;
    const userId = req.user.id; // Assuming user ID is available in req.user
    try {
        const result = await db.query(
            'INSERT INTO amazon_accounts (user_id, account_name, region, access_token, refresh_token) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [userId, account_name, region, access_token, refresh_token]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding account:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
