import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

const thStyle = {
  padding: "12px 16px",
  fontSize: "0.95rem",
  fontWeight: "600",
  letterSpacing: "0.5px",
};

const tdStyle = {
  padding: "12px 16px",
  fontSize: "0.9rem",
  color: "#334155",
};

const ToggleButton = styled.button`
  position: relative;
  width: 44px;
  height: 24px;
  background-color: ${(props) => (props.isActive ? "#065f46" : "#d1d5db")};
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
  outline: none;

  &:after {
    content: "";
    position: absolute;
    top: 2px;
    left: ${(props) => (props.isActive ? "22px" : "2px")};
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 50%;
    transition: left 0.2s ease;
  }

  &:hover {
    background-color: ${(props) => (props.isActive ? "#064e3b" : "#9ca3af")};
  }
`;

const BrokerList = () => {
  const [brokers, setBrokers] = useState([]);

  useEffect(() => {
    const fetchBrokers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/broker");
        setBrokers(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBrokers();
  }, []);

  const handleToggleStatus = async (brokerId, currentStatus) => {
    try {
      const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
      await axios.put(`http://localhost:5000/api/broker/${brokerId}`, {
        status: newStatus,
      });
      setBrokers((prevBrokers) =>
        prevBrokers.map((broker) =>
          broker.id === brokerId ? { ...broker, status: newStatus } : broker
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <div style={{ padding: "2rem", backgroundColor: "#f8fafc" }}>
      <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem", fontWeight: "bold", color: "#1e293b" }}>
        Broker List
      </h2>

      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "#fff",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            overflow: "hidden",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#2563eb", color: "#fff", textAlign: "left" }}>
              <th style={thStyle}>Full Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Phone No</th>
              <th style={thStyle}>Address</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Enable/Disable</th>
            </tr>
          </thead>
          <tbody>
            {brokers.map((broker, index) => (
              <tr
                key={broker.id}
                style={{
                  backgroundColor: index % 2 === 0 ? "#f1f5f9" : "#fff",
                  transition: "background-color 0.2s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e2e8f0")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    index % 2 === 0 ? "#f1f5f9" : "#fff")
                }
              >
                <td style={tdStyle}>{broker.name}</td>
                <td style={tdStyle}>{broker.email}</td>
                <td style={tdStyle}>{broker.phone}</td>
                <td style={tdStyle}>{broker.address}</td>
                <td style={tdStyle}>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "20px",
                      fontSize: "0.85rem",
                      fontWeight: "bold",
                      color:
                        broker.status === "Active" ? "#065f46" : "#92400e",
                      backgroundColor:
                        broker.status === "Active" ? "#d1fae5" : "#fef3c7",
                    }}
                  >
                    {broker.status}
                  </span>
                </td>
                <td style={tdStyle}>
                  <ToggleButton
                    isActive={broker.status === "Active"}
                    onClick={() => handleToggleStatus(broker.id, broker.status)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BrokerList;