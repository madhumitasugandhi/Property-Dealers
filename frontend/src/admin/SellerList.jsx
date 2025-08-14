import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";

const Wrapper = styled.div`
  padding: 2rem;
  background: #f1f5f9;
`;
const NavBar = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  font-size: 1rem;
  color: #333;

  a {
    text-decoration: none;
    color: #005ca8;
    font-weight: 500;
    padding: 5px 10px;
    border-radius: 4px;
    transition: all 0.3s ease;

    &:hover {
      background-color: #f0f0f0;
      color: #003d73;
    }

    &.active {
      background-color: #005ca8;
      color: white;
    }

    &:after {
      content: '/';
      margin-left: 10px;
      color: #666;
    }

    &:last-child:after {
      content: '';
    }
  }
`;
const TableWrapper = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  overflow: hidden;
`;

const Th = styled.th`
  padding: 12px 16px;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  background-color: #2563eb;
  color: #fff;
  text-align: left;
`;

const Td = styled.td`
  padding: 12px 16px;
  font-size: 0.9rem;
  color: #334155;
  vertical-align: middle;
`;

const Tr = styled.tr`
  background-color: ${(props) => (props.striped ? "#f8fafc" : "white")};
  transition: background-color 0.2s ease;
  &:hover {
    background-color: #e2e8f0;
  }
`;

const ImageGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const Image = styled.img`
  width: 80px;
  height: 60px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
`;

const PriceTag = styled.span`
  background-color: #d1fae5;
  color: #065f46;
  padding: 4px 8px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
`;

const SellerList = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/seller");
        setSellers(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching sellers:", error.response?.data || error.message);
        setLoading(false);
      }
    };

    fetchSellers();
  }, []);

  if (loading) {
    return (
      <Wrapper>
        <p>Loading sellers...</p>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h2 style={{ fontSize: "1.8rem", fontWeight: "bold", marginBottom: "1rem", color: "#1e293b" }}>
        Seller List
      </h2>
      <NavBar>
        <a href="#" onClick={() => navigate('/admin/dashboard')}>Dashboard</a>
        <a href="#" onClick={() => navigate('/admin/seller')}>Seller</a>
      </NavBar>
      {sellers.length === 0 ? (
        <p>No sellers found.</p>
      ) : (
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <Th>Name</Th>
                <Th>Phone</Th>
                <Th>Location</Th>
                <Th>Type</Th>
                <Th>Area (sqft)</Th>
                <Th>Price/Sqft</Th>
                <Th>Total Price</Th>
                <Th>Images</Th>
                <Th>BHK</Th>
                <Th>Floor</Th>
              </tr>
            </thead>
            <tbody>
              {sellers.map((seller, index) => (
                <Tr key={seller.id} striped={index % 2 === 0}>
                  <Td>{seller.name}</Td>
                  <Td>{seller.phone}</Td>
                  <Td>{seller.location}</Td>
                  <Td>{seller.propertyType}</Td>
                  <Td>{seller.area || "-"}</Td>
                  <Td>
                    {seller.pricePerSqft ? (
                      <PriceTag>₹{seller.pricePerSqft}</PriceTag>
                    ) : (
                      "-"
                    )}
                  </Td>
                  <Td>₹{seller.totalPrice || "-"}</Td>
                  <Td>
                    {seller.images && seller.images.length > 0 ? (
                      <ImageGrid>
                        {seller.images.map((img, idx) => (
                          <Image
                            key={idx}
                            src={`http://localhost:5000/uploads/${img}`}
                            alt={`Property ${seller.name}`}
                          />
                        ))}
                      </ImageGrid>
                    ) : (
                      "No Images"
                    )}
                  </Td>
                  <Td>{seller.bhk || "-"}</Td>
                  <Td>{seller.floor || "-"}</Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </TableWrapper>
      )}
    </Wrapper>
  );
};

export default SellerList;
