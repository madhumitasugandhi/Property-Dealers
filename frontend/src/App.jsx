import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios"; // Import axios
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HomeCard from "./components/HomeCard";
import PropertyDetails from "./components/PropertyDetails";
import Footer from "./components/Footer";
import CategorySection from "./components/CategorySection";
import Contact from "./components/ContactUs";
import ContactModal from "./components/ContactModal";
import WhyChooseUs from "./components/WhyChooseUs";
import About from "./components/About";
import Buy from "./components/Buy";
import Sell from "./components/Sell";
import Services from "./pages/Services";
import TermsAndConditions from "./components/TermsAndConditions";
import PrivacyPolicy from "./components/PrivacyPolicy";
import ProtectedRoute from "./components/ProtectedRoute";
import SoldProperties from './pages/SoldProperties';

//admin imports

import AdminLogin from "./admin/Login";
import AdminLayout from "./admin/AdminLayout.jsx";
import Dashboard from "./admin/Dashboard.jsx";
import AddProperty from "./admin/AddProperty";
import PropertyList from "./admin/PropertyList";
import BrokerList from "./admin/BrokerList";
import BuyerList from "./admin/BuyerList";
import SellerList from "./admin/SellerList";
import AdminMessages from "./admin/AdminMessages";
import AdminSettings from "./admin/AdminSettings";
import Logout from "./pages/Logout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const location = useLocation();
  const [hasScrolled, setHasScrolled] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [properties, setProperties] = useState([]); // State for properties
  const [loading, setLoading] = useState(true); // State for loading

  const hideLayout = location.pathname.startsWith("/admin");

  // Fetch properties from backend
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/property");
        setProperties(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching properties:", error);
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  // Handle scroll for contact modal
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

  // Filter properties based on selected category
  const filteredProperties =
    selectedCategory === "All"
      ? properties
      : properties.filter(
          (p) => p.type.toLowerCase() === selectedCategory.toLowerCase()
        );

  useEffect(() => {
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, []);

  return (
    <>
      {!hideLayout && <Navbar />}

      {!hideLayout && showContactModal && (
        <ContactModal onClose={() => setShowContactModal(false)} />
      )}

      <TermsAndConditions
        show={showTermsModal}
        onClose={() => setShowTermsModal(false)}
      />

      <PrivacyPolicy
        show={showPrivacyModal}
        onClose={() => setShowPrivacyModal(false)}
      />

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

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    gap: "1rem",
                    marginBottom: "2rem",
                  }}
                >
                  {["All", "Flat","Farm", "Shop", "Land"].map((cat) => (
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

              {loading ? (
                <p>Loading properties...</p>
              ) : (
                <div className="card-grid">
                  {filteredProperties.length > 0 ? (
                    filteredProperties.map((property) => (
                      <HomeCard
                        key={property.id}
                        id={property.id}
                        image={`http://localhost:5000${property.image_path}`} // Adjust image path
                        title={property.title}
                        location={property.location}
                        bedrooms={property.bhk ? parseInt(property.bhk) : 0} // Handle BHK
                        area={property.area}
                        price={property.price}
                        isFavorited={false} // You can add logic for favoriting if needed
                      />
                    ))
                  ) : (
                    <p>No properties found for this category.</p>
                  )}
                </div>
              )}

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
        <Route path="/buy" element={<Buy />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/services" element={<Services />} />
        <Route path="/sold-properties" element={<SoldProperties />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="add-property" element={<AddProperty />} />
          <Route path="properties" element={<PropertyList />} />
          <Route path="agents" element={<BrokerList />} />
          <Route path="buyer" element={<BuyerList />} />
          <Route path="seller" element={<SellerList />} />
          <Route path="messages" element={<AdminMessages />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
      <ToastContainer />
      {!hideLayout && (
        <Footer
          onTermsClick={() => setShowTermsModal(true)}
          onPrivacyClick={() => setShowPrivacyModal(true)}
        />
      )}
    </>
  );
};

export default App;