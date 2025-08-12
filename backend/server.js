import express from 'express';
import cors from 'cors';
import sequelize from './config/db.js';
import propertyRoutes from './routes/property.js';
import brokerRoutes from './routes/broker.js';
import buyerRoutes from './routes/buyer.js';
import sellerPropertyRoutes from './routes/seller.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use('/api/property', propertyRoutes);
app.use('/api/broker', brokerRoutes);
app.use('/api/buyer', buyerRoutes);
app.use('/api/seller', sellerPropertyRoutes);
app.use('/api/contact', contactRoutes);

sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));