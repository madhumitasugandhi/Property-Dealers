import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th, td {
    border: 1px solid #ccc;
    padding: 10px;
    text-align: left;
  }

  th {
    background-color: #005ca8;
    color: white;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const BuyerList = () => {
  const [buyers, setBuyers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/buyer')
      .then((res) => setBuyers(res.data))
      .catch((err) => console.error('Failed to fetch buyers:', err));
  }, []);

  return (
    <div>
      <h2>All Buyer Requests</h2>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Property</th>
            <th>Location</th>
            <th>BHK</th>
            <th>Area</th>
            <th>Price</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {buyers.map((buyer) => (
            <tr key={buyer.id}>
              <td>{buyer.name}</td>
              <td>{buyer.phone}</td>
              <td>{buyer.property_type}</td>
              <td>{buyer.location}</td>
              <td>{buyer.bhk}</td>
              <td>{buyer.area}</td>
              <td>₹{parseFloat(buyer.price).toLocaleString()}</td>
              <td>{buyer.status}</td>
              <td>{new Date(buyer.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default BuyerList;
