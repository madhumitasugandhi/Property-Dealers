import React, { useState } from "react";
import HomeCard from "./HomeCard";
// import { useNavigate } from "react-router-dom";
import Img from "../assets/bg2.jpg";

const properties = [
  {
    id: 1,
    image: Img,
    agentName: "Lalit Kaushik",
    agentImage: "https://via.placeholder.com/40",
    title: "4BHK Apartment For Sale In Vasant Vihar",
    location: "Vasant Vihar",
    bedrooms: 4,
    bathrooms: 2,
    area: 2300,
    isFavorited: true,
    category: "Flat",
    price: 12000000,
  },
  {
    id: 2,
    image: Img,
    agentName: "Simran Khanna",
    agentImage: "https://via.placeholder.com/40",
    title: "3BHK Flat in South Delhi",
    location: "South Extension",
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    isFavorited: false,
    category: "Flat",
    price: 9500000,
  },
  {
    id: 3,
    image: Img,
    agentName: "Raj Mehta",
    agentImage: "https://via.placeholder.com/40",
    title: "Luxurious Villa with Garden",
    location: "Greater Kailash",
    bedrooms: 5,
    bathrooms: 4,
    area: 3500,
    isFavorited: true,
    category: "Farm",
    price: 22000000,
  },
  {
    id: 4,
    image: Img,
    agentName: "Priya Anand",
    agentImage: "https://via.placeholder.com/40",
    title: "2BHK Budget Apartment",
    location: "Dwarka",
    bedrooms: 2,
    bathrooms: 1,
    area: 1200,
    isFavorited: false,
    category: "Flat",
    price: 6200000,
  },
  {
    id: 5,
    image: Img,
    agentName: "Pooja Aru",
    agentImage: "https://via.placeholder.com/40",
    title: "Commercial Shop For Rent",
    location: "Karol Bagh",
    bedrooms: 0,
    bathrooms: 1,
    area: 600,
    isFavorited: false,
    category: "Shop",
    price: 7800000,
  },
  {
    id: 6,
    image: Img,
    agentName: "Pooja Aru",
    agentImage: "https://via.placeholder.com/40",
    title: "Residential Land Plot",
    location: "Karol Bagh",
    bedrooms: 0,
    bathrooms: 1,
    area: 600,
    isFavorited: false,
    category: "Land",
    price: 15000000,
  },
];

const Buy = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortPrice, setSortPrice] = useState("");
  // const navigate = useNavigate();

  const filtered = properties
    .filter((p) =>
      selectedCategory === "All" ? true : p.category === selectedCategory
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
      {/* Page Banner */}
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
          Find your perfect property by location, category and price
        </p>
      </div>

      {/* Filters */}
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
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {filtered.map((p) => (
          <HomeCard key={p.id} {...p} price={p.price} />
        ))}
      </div>
    </div>
  );
};

export default Buy;
