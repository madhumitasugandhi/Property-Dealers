import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HomeCard from "./components/HomeCard";
import PropertyDetails from "./components/PropertyDetails";
import Img from "./assets/bg2.jpg";
import "./App.css";
import Footer from "./components/Footer";
import CategorySection from "./components/CategorySection";
import Contact from "./components/ContactUs";
import ContactModal from "./components/ContactModal";
import WhyChooseUs from "./components/WhyChooseUs";
import About from "./components/About";
import LoginModal from "./components/LoginModal";
import RegistrationModal from "./components/RegistrationModal";

const App = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const handleScroll = () => {
      if (!hasScrolled) {
        setShowContactModal(true);
        setHasScrolled(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasScrolled]);

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
    },
    {
      id: 6,
      image: Img,
      agentName: "Pooja Aru",
      agentImage: "https://via.placeholder.com/40",
      title: "Commercial Shop For Rent",
      location: "Karol Bagh",
      bedrooms: 0,
      bathrooms: 1,
      area: 600,
      isFavorited: false,
      category: "Land",
    },
  ];

  //LoginModal

  const filteredProperties =
    selectedCategory === "All"
      ? properties
      : properties.filter((p) => p.category === selectedCategory);

  const toggleLoginModal = () => {
    document.body.classList.toggle("modal-open", !showLoginModal);
    setShowLoginModal(!showLoginModal);
  };

  useEffect(() => {
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, []);

  return (
    <Router>
      <Navbar
        onLoginClick={() => setShowLoginModal(true)}
        onRegisterClick={() => setShowRegisterModal(true)}
      />
      <LoginModal showModal={showLoginModal} setShowModal={setShowLoginModal} />
      {showContactModal && (
        <ContactModal onClose={() => setShowContactModal(false)} />
      )}

      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
      {showLoginModal && <LoginModal onClose={toggleLoginModal} />}

      <RegistrationModal
        showModal={showRegisterModal}
        setShowModal={setShowRegisterModal}
      />

      {showRegisterModal && (
        <RegistrationModal onClose={() => setShowRegisterModal(false)} />
      )}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <WhyChooseUs />
              <div
                style={{
                  textAlign: "center",
                  margin: "3rem 0",
                  position: "relative",
                }}
              >
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
                        left: "-15px",
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
                        left: "30px",
                        width: "30px",
                        height: "30px",
                        backgroundColor: "#005ca8",
                        border: "2px solid white",
                        borderRadius: "6px",
                        zIndex: -1,
                      }}
                    ></span>
                    Builder
                  </span>
                  Floor For Sale
                </h2>

                <p
                  style={{
                    fontSize: "1.125rem",
                    color: "#323233ff",
                    maxWidth: "600px",
                    margin: "0.75rem auto 1.5rem",
                    textAlign: "center",
                  }}
                >
                  Find Your Perfect Home with a Trusted Real Estate Agent
                </p>

                {/* 🔹 Category Filter Tabs */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    gap: "1rem",
                    marginBottom: "2rem",
                  }}
                >
                  {["All", "Flat", "Shop", "Land", "Farm"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      style={{
                        padding: "10px 20px",
                        borderRadius: "20px",
                        border:
                          selectedCategory === cat
                            ? "2px solid #005ca8"
                            : "1px solid #ccc",
                        backgroundColor:
                          selectedCategory === cat ? "#005ca8" : "#fff",
                        color: selectedCategory === cat ? "#fff" : "#333",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <motion.div
                  className="underline-bar"
                  initial={{ x: -100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  viewport={{ once: false, amount: 0.5 }}
                  style={{
                    width: "clamp(150px, 40vw, 220px)",
                    height: "4px",
                    backgroundColor: "#005ca8",
                    margin: "1rem auto 0",
                    borderRadius: "2px",
                  }}
                />
              </div>

              {/* Cards based on filter */}
              <div className="card-grid">
                {filteredProperties.map((property) => (
                  <HomeCard key={property.id} {...property} />
                ))}
              </div>

              <CategorySection />
            </>
          }
        />
        <Route
          path="/property/:id"
          element={<PropertyDetails properties={properties} />}
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;
