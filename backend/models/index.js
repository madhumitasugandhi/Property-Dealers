import express from 'express';
import Property from './Property.js';
import Broker from './Broker.js';


const app = express();

app.use(express.json());

Property.belongsTo(Broker, { foreignKey: 'broker_id' });
Broker.hasMany(Property, { foreignKey: 'broker_id' });

export { Property, Broker};
