import express from 'express';
import connection from './config/db.js';

const app = express();
const port = 3000; 

// Middleware to parse JSON
app.use(express.json());

// Sample Route to Test Database Connection
app.get('/dealers', (req, res) => {
    connection.query('SELECT * FROM dealers', (err, results) => {
        if (err) {
            console.error('Error fetching dealers:', err);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        res.json(results);
    });
});

// Start the Server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});