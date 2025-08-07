import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/properties'); // Adjust port
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };
    fetchProperties();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Property List</h1>
      {properties.length > 0 ? (
        <ul>
          {properties.map((property) => (
            <li key={property.id}>
              ID: {property.id}, 
              Type ID: {property.type_id}, 
              Price: ${property.price}, 
              Location: {property.location}, 
              BHK: {property.bhk || 'N/A'},
              Status: {property.status}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading properties...</p>
      )}
    </div>
  );
};

export default PropertyList;