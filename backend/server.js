import express from 'express';
import cors from 'cors';
import sequelize from './config/db.js';
import propertyRoutes from './routes/property.js';
import buyerRoutes from './routes/buyer.js';
import propertyTypeRoutes from './routes/propertyType.js';
import sellerRoutes from './routes/seller.js';
// import { Property, PropertyType, Seller, Broker, Buyer } from './models/index.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/properties', propertyRoutes);
app.use('/api/buyers', buyerRoutes);
app.use('/api/property-types', propertyTypeRoutes);
app.use('/api/sellers', sellerRoutes);

sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));