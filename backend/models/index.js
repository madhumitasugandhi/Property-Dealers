import Property from './Property.js';
import PropertyType from './PropertyType.js';
import Seller from './Seller.js';
import Broker from './Broker.js';
import Buyer from './Buyer.js';

Property.belongsTo(PropertyType, { foreignKey: 'type_id' });
PropertyType.hasMany(Property, { foreignKey: 'type_id' });
Buyer.belongsTo(PropertyType, { foreignKey: 'type_id' });
PropertyType.hasMany(Buyer, { foreignKey: 'type_id' });
Seller.belongsTo(Property, { foreignKey: 'property_id' });
Property.hasMany(Seller, { foreignKey: 'property_id' });
Seller.belongsTo(PropertyType, { foreignKey: 'type_id' });
PropertyType.hasMany(Seller, { foreignKey: 'type_id' });
Property.belongsTo(Broker, { foreignKey: 'broker_id' });
Broker.hasMany(Property, { foreignKey: 'broker_id' });

export { Property, PropertyType, Seller, Broker, Buyer };