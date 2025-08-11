import React, { useEffect, useState } from "react";
import axios from "axios";

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
              {/* <th style={thStyle}>ID</th> */}
              <th style={thStyle}>Full Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Phone No</th>
              <th style={thStyle}>Address</th>
              <th style={thStyle}>Status</th>
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
                {/* <td style={tdStyle}>{broker.id}</td> */}
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Styles for table cells
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

export default BrokerList;
