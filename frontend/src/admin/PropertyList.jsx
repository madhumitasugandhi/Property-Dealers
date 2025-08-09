import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 2rem;
  background: #f1f5f9;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
`;

const Th = styled.th`
  padding: 1rem;
  border-bottom: 2px solid #cbd5e1;
  text-align: left;
  font-weight: bold;
  color: #1e293b;
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
`;

const Tr = styled.tr`
  &:hover {
    background: #f8fafc;
  }
`;

const Image = styled.img`
  width: 100px;
  height: auto;
  border-radius: 0.5rem;
`;

const ManageProperty = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/property');
        setProperties(res.data);
      } catch (err) {
        console.error('Failed to fetch properties', err);
      }
    };

    fetchProperties();
  }, []);

  return (
    <Wrapper>
      <h2>Manage Properties</h2>
      {properties.length === 0 ? (
        <p>No properties found.</p>
      ) : (
        <Table>
          <thead>
            <Tr>
              <Th>Title</Th>
              <Th>Location</Th>
              <Th>Price</Th>
              <Th>Type</Th>
              <Th>Image</Th>
              <Th>BHK</Th>
              <Th>Area (sqft)</Th>
              <Th>Floor</Th>
              
            </Tr>
          </thead>
          <tbody>
            {properties.map((property) => (
                <Tr key={property.id}>
                <Td>{property.title}</Td>
                <Td>{property.location}</Td>
                <Td>₹{property.price}</Td>
                <Td>{property.type}</Td>
                <Td>
                  {property.image ? (
                    <Image src={`http://localhost:5000/uploads/${property.image}`} alt={property.title} />
                  ) : (
                    'No Image'
                  )}
                </Td>
                <Td>{property.bhk || '-'}</Td>
                <Td>{property.area || '-'}</Td>
                <Td>{property.floor || '-'}</Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      )}
    </Wrapper>
  );
};

export default ManageProperty;