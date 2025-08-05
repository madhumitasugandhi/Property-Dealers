import sequelize from '../config/db.js';
import Property from './PropertyModel.js';
import PropertyType from './propertyTypeModel.js';
import Seller from './sellerModel.js';
import Broker from './BrokerModal.js';

Property.belongsTo(PropertyType, { foreignKey: 'property_type_id' });
Property.belongsTo(Seller, { foreignKey: 'seller_id' });
PropertyType.hasMany(Property, { foreignKey: 'property_type_id' });
Seller.hasMany(Property, { foreignKey: 'seller_id' });
// Example: Broker can have many Properties
Property.belongsTo(Broker, { foreignKey: 'broker_id' }); // Add broker_id to Property model if needed
Broker.hasMany(Property, { foreignKey: 'broker_id' });

export { Property, PropertyType, Seller, Broker };