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

const SellerList = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/seller');
        setSellers(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sellers:', error.response?.data || error.message);
        setLoading(false);
      }
    };

    fetchSellers();
  }, []);

  if (loading) {
    return <Wrapper><p>Loading sellers...</p></Wrapper>;
  }

  return (
    <Wrapper>
      <h2>Seller List</h2>
      {sellers.length === 0 ? (
        <p>No sellers found.</p>
      ) : (
        <Table>
          <thead>
            <Tr>
              <Th>Name</Th>
              <Th>Phone</Th>
              <Th>Location</Th>
              <Th>Type</Th>
              <Th>Area (sqft)</Th>
              <Th>Price/Sqft</Th> {/* Added Price Per Sqft */}
              <Th>Total Price</Th>
              <Th>Images</Th>
              <Th>BHK</Th>
              <Th>Floor</Th>
            </Tr>
          </thead>
          <tbody>
            {sellers.map((seller) => (
              <Tr key={seller.id}>
                <Td>{seller.name}</Td>
                <Td>{seller.phone}</Td>
                <Td>{seller.location}</Td>
                <Td>{seller.propertyType}</Td>
                <Td>{seller.area || '-'}</Td>
                <Td>₹{seller.pricePerSqft || '-'}</Td> {/* Added Price Per Sqft */}
                <Td>₹{seller.totalPrice || '-'}</Td>
                <Td>
                  {seller.images && seller.images.length > 0 ? (
                    <div className="flex gap-2">
                      {seller.images.map((img, idx) => (
                        <Image
                          key={idx}
                          src={`http://localhost:5000/uploads/${img}`}
                          alt={`Property ${seller.name}`}
                        />
                      ))}
                    </div>
                  ) : (
                    'No Images'
                  )}
                </Td>
                <Td>{seller.bhk || '-'}</Td>
                <Td>{seller.floor || '-'}</Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      )}
    </Wrapper>
  );
};

export default SellerList;