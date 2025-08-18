import React, { useState, useEffect } from "react";
import axios from "axios";
import HomeCard from "./HomeCard";

const Buy = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortPrice, setSortPrice] = useState("");
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const adminResponse = await axios.get("http://localhost:5000/api/property");
        const adminProperties = Array.isArray(adminResponse.data) ? adminResponse.data : [];
        
        const sellerResponse = await axios.get("http://localhost:5000/api/seller/accepted");
        const sellerProperties = Array.isArray(sellerResponse.data) ? sellerResponse.data : [];

        const normalizedAdmin = adminProperties.map(prop => ({
          id: prop.id,
          images: prop.images && Array.isArray(prop.images) && prop.images.length > 0 ? prop.images : [null],
          title: prop.title,
          location: prop.location,
          bhk: prop.bhk,
          area: prop.area,
          price: prop.totalPrice,
          propertyType: prop.propertyType, // Changed from type to propertyType for consistency
          taluka: prop.taluka,
        }));

        const normalizedSeller = sellerProperties.map(prop => ({
          id: prop.id,
          images: prop.images && Array.isArray(prop.images) && prop.images.length > 0 ? prop.images : [null],
          title: prop.title || prop.name,
          location: prop.location,
          bhk: prop.bhk,
          area: prop.area,
          price: prop.totalPrice,
          propertyType: prop.propertyType, // Changed from type to propertyType for consistency
          taluka: prop.taluka,
        }));

        const allProperties = [...normalizedAdmin, ...normalizedSeller];
        setProperties(allProperties);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching properties:", error);
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const filtered = properties
    .filter((p) =>
      selectedCategory === "All"
        ? true
        : p.propertyType.toLowerCase() === selectedCategory.toLowerCase() // Updated to use propertyType
    )
    .filter((p) =>
      p.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortPrice === "low") return a.price - b.price;
      if (sortPrice === "high") return b.price - a.price;
      return 0;
    });

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Page Banner (unchanged) */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <style>
          {`
            @media (max-width: 768px) {
              .builder-wrapper {
                font-size: 2rem !important;
              }
              .big-box {
                width: 50px !important;
                height: 50px !important;
                top: -12px !important;
                left: -12px !important;
              }
              .small-box {
                width: 25px !important;
                height: 25px !important;
                top: -28px !important;
                left: 24px !important;
              }
              .underline-bar {
                margin-top: 0.8rem !important;
              }
            }
          `}
        </style>
        <div style={{ textAlign: "center", marginTop: "60px", marginBottom: "20px" }}>
          <h2
            className="builder-wrapper"
            style={{
              fontSize: "2.5rem",
              fontWeight: "800",
              color: "#1f2937",
              position: "relative",
              display: "inline-block",
              lineHeight: "1.2",
            }}
          >
            <span
              style={{
                position: "relative",
                display: "inline-block",
                marginRight: "8px",
              }}
            >
              <span
                className="big-box"
                style={{
                  position: "absolute",
                  top: "-15px",
                  left: "-20px",
                  width: "60px",
                  height: "60px",
                  backgroundColor: "#005ca8",
                  borderRadius: "6px",
                  zIndex: -2,
                }}
              ></span>
              <span
                className="small-box"
                style={{
                  position: "absolute",
                  top: "-32px",
                  left: "20px",
                  width: "30px",
                  height: "30px",
                  backgroundColor: "#005ca8",
                  border: "2px solid white",
                  borderRadius: "6px",
                  zIndex: -1,
                }}
              ></span>
              Browse
            </span>
            Properties
          </h2>
        </div>
        <p style={{ fontSize: "1.1rem", color: "#555" }}>
          Find your perfect property by location, category, and price
        </p>
      </div>

      {/* Filters (unchanged) */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "2.5rem",
          justifyContent: "center",
        }}
      >
        {["All", "Flat", "Shop", "Land", "Farm"].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: "8px 16px",
              borderRadius: "20px",
              border:
                selectedCategory === cat
                  ? "2px solid #005ca8"
                  : "1px solid #ccc",
              backgroundColor:
                selectedCategory === cat ? "#005ca8" : "#fff",
              color: selectedCategory === cat ? "#fff" : "#333",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            {cat}
          </button>
        ))}
        <input
          type="text"
          placeholder="Search by location"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "20px",
            border: "1px solid #ccc",
            minWidth: "200px",
          }}
        />
        <select
          value={sortPrice}
          onChange={(e) => setSortPrice(e.target.value)}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "20px",
            border: "1px solid #ccc",
          }}
        >
          <option value="">Sort by Price</option>
          <option value="low">Low to High</option>
          <option value="high">High to Low</option>
        </select>
      </div>

      {/* Property Cards */}
      {loading ? (
        <p>Loading properties...</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {filtered.length > 0 ? (
            filtered.map((p) => (
              <HomeCard
                key={p.id}
                id={p.id}
                images={p.images && p.images.length > 0 ? p.images[0] : "https://placehold.co/360x200?text=No+Image"}
                title={p.title}
                location={p.location}
                bhk={p.bhk}
                area={p.area}
                price={p.price}
                propertyType={p.propertyType} // Updated to use propertyType
                taluka={p.taluka}
              />
            ))
          ) : (
            <p>No properties found for this category or search term.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Buy;