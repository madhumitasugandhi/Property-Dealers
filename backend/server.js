import express from 'express';
import cors from 'cors';
import sequelize from './config/db.js';
import propertyRoutes from './routes/property.js';
import brokerRoutes from './routes/broker.js';
import buyerRoutes from './routes/buyer.js';
import sellerPropertyRoutes from './routes/seller.js';
import contactRoutes from './routes/contact.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Log all incoming requests for debugging
app.use((req, res, next) => {
  console.log(`Received ${req.method} request to ${req.url}`);
  next();
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/property', propertyRoutes);
app.use('/api/broker', brokerRoutes);
app.use('/api/buyer', buyerRoutes);
app.use('/api/seller', sellerPropertyRoutes);
app.use('/api/contact', contactRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ message: 'Server error', error: err.message });
});

// Database connection
sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database connection error:', err));

sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synced');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('Database sync error:', err));