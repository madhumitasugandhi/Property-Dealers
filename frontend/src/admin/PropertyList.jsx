import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Wrapper = styled.div`
  padding: 1rem;
  background: #f8fafc;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const TableContainer = styled.div`
  max-width: 100%; /* Changed to 100% for better responsiveness */
  margin: 0 auto;
  overflow-x: auto;
  border-radius: 0.75rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: white;
  border-radius: 0.75rem;
  overflow: hidden;
  table-layout: auto; /* Allow columns to adjust width dynamically */

  @media (max-width: 768px) {
    min-width: auto; /* No min-width on mobile for full responsiveness */
  }
`;

const Thead = styled.thead`
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  color: white;
`;

const Th = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  &:first-child {
    border-top-left-radius: 0.75rem;
  }
  &:last-child {
    border-top-right-radius: 0.75rem;
  }

  @media (max-width: 768px) {
    padding: 0.75rem;
    font-size: 0.75rem;
    white-space: nowrap;
  }
`;


const Tr = styled.tr`
  transition: background 0.2s ease;
  &:nth-child(even) {
    background: #f9fafb;
  }
  
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  font-size: 0.9rem;
  color: #1f2937;
  vertical-align: middle;
  max-width: 200px; /* Prevent text overflow */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 768px) {
    padding: 0.75rem;
    font-size: 0.8rem;
    max-width: 100px;
    &:nth-child(5), &:nth-child(8) { /* Hide Image and Floor on mobile */
      display: none;
    }
  }

  &:last-child {
    position: sticky;
    right: 0;
    background: white;
    box-shadow: -2px 0 4px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: flex-start;

    @media (max-width: 768px) {
      flex-direction: column; /* Vertical buttons on small screens */
      gap: 0.5rem; /* Space between buttons */
      padding: 0.75rem 0.5rem;
    }
  }
`;

const Image = styled.img`
  width: 100px;
  height: 60px;
  object-fit: cover;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
`;

const ActionButton = styled.button`
  border: none;
  background: #fff;
  cursor: pointer;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  margin-right: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    width: 28px;
    height: 28px;
    margin-right: 0; /* No margin on vertical stack */
    margin-bottom: 0.3rem; /* Space for vertical */
  }

  &:last-child {
    margin-right: 0;
    margin-bottom: 0;
  }
`;

const EditButton = styled(ActionButton)`
  color: #3b82f6;
  &:hover {
    background: #dbeafe;
  }
`;

const DeleteButton = styled(ActionButton)`
  color: #ef4444;
  &:hover {
    background: #fee2e2;
  }
`;

const LoadingRow = styled.tr`
  animation: pulse 1.5s infinite ease-in-out;
  @keyframes pulse {
    0% { background: #f3f4f6; }
    50% { background: #e5e7eb; }
    100% { background: #f3f4f6; }
  }
`;

const LoadingTd = styled.td`
  padding: 1rem;
  height: 50px;

  @media (max-width: 768px) {
    padding: 0.75rem;
  }
`;

const Title = styled.h2`
  font-size: 1.6rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1.2rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const EmptyMessage = styled.p`
  text-align: center;
  color: #6b7280;
  font-size: 1rem;
  padding: 1.5rem;
`;

const ManageProperty = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:5000/api/property');
        setProperties(res.data);
      } catch (err) {
        console.error('Failed to fetch properties', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // In ManageProperty component
const handleDelete = async (id) => {
  if (window.confirm('Are you sure you want to delete this property?')) {
    try {
      const response = await axios.delete(`http://localhost:5000/api/property/${id}`);
      if (response.status === 200) {
        setProperties(properties.filter((prop) => prop.id !== id));
        alert('Property deleted successfully!');
      }
    } catch (err) {
      console.error('Failed to delete property', err);
      alert('Failed to delete property: ' + (err.response?.data?.error || 'Unknown error'));
    }
  }
};

  const handleEdit = (id) => {
    alert(`Edit property with ID: ${id}`); // Replace with navigation to edit page
  };

  return (
    <Wrapper>
      <Title>Manage Properties</Title>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Location</Th>
              <Th>Price</Th>
              <Th>Type</Th>
              <Th>Image</Th>
              <Th>BHK</Th>
              <Th>Area (sqft)</Th>
              <Th>Floor</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <tbody>
            {loading ? (
              Array(5).fill().map((_, i) => (
                <LoadingRow key={i}>
                  <LoadingTd colSpan={9}></LoadingTd>
                </LoadingRow>
              ))
            ) : properties.length === 0 ? (
              <Tr>
                <Td colSpan={9}>
                  <EmptyMessage>No properties found.</EmptyMessage>
                </Td>
              </Tr>
            ) : (
              properties.map((property) => (
                <Tr key={property.id}>
                  <Td title={property.title}>{property.title}</Td>
                  <Td title={property.location}>{property.location}</Td>
                  <Td>₹{property.price.toLocaleString()}</Td>
                  <Td>{property.type}</Td>
                  <Td>
                    {property.image ? (
                      <Image src={`http://localhost:5000/uploads/${property.image_path}`} alt={property.title} />
                    ) : (
                      'No Image'
                    )}
                  </Td>
                  <Td>{property.bhk || '-'}</Td>
                  <Td>{property.area ? property.area.toLocaleString() : '-'}</Td>
                  <Td>{property.floor || '-'}</Td>
                  <Td>
                    <EditButton onClick={() => handleEdit(property.id)} title="Edit Property">
                      <FaEdit />
                    </EditButton>
                    <DeleteButton onClick={() => handleDelete(property.id)} title="Delete Property">
                      <FaTrash />
                    </DeleteButton>
                  </Td>
                </Tr>
              ))
            )}
          </tbody>
        </Table>
      </TableContainer>
    </Wrapper>
  );
};

export default ManageProperty;