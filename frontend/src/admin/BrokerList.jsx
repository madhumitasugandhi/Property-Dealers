import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BrokerList = () => {
  const [brokers, setBrokers] = useState([]);

  useEffect(() => {
    const fetchBrokers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/broker');
        setBrokers(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBrokers();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Broker List</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone No</th>
            <th>Address</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {brokers.map(broker => (
            <tr key={broker.id}>
              <td>{broker.id}</td>
              <td>{broker.name}</td>
              <td>{broker.email}</td>
              <td>{broker.phone}</td>
              <td>{broker.address}</td>
              <td>{broker.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BrokerList;
