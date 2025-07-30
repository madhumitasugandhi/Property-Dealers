import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HomeCard from './components/HomeCard';
import PropertyDetails from './components/PropertyDetails';
import Img from './assets/bg2.jpg';
import './App.css';
import Footer from './components/Footer';
import CategorySection from './components/CategorySection';
import Contact from './components/ContactUs';
import ContactModal from './components/ContactModal'; // 👈 popup form component

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!hasScrolled) {
        setShowModal(true);
        setHasScrolled(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolled]);

  const properties = [
    {
      id: 1,
      image: Img,
      agentName: 'Lalit Kaushik',
      agentImage: 'https://via.placeholder.com/40',
      title: '4BHK Apartment For Sale In Vasant Vihar',
      location: 'Vasant Vihar',
      bedrooms: 4,
      bathrooms: 2,
      area: 2300,
      isFavorited: true,
    },
    {
      id: 2,
      image: Img,
      agentName: 'Simran Khanna',
      agentImage: 'https://via.placeholder.com/40',
      title: '3BHK Flat in South Delhi',
      location: 'South Extension',
      bedrooms: 3,
      bathrooms: 2,
      area: 1800,
      isFavorited: false,
    },
    {
      id: 3,
      image: Img,
      agentName: 'Raj Mehta',
      agentImage: 'https://via.placeholder.com/40',
      title: 'Luxurious Villa with Garden',
      location: 'Greater Kailash',
      bedrooms: 5,
      bathrooms: 4,
      area: 3500,
      isFavorited: true,
    },
    {
      id: 4,
      image: Img,
      agentName: 'Priya Anand',
      agentImage: 'https://via.placeholder.com/40',
      title: '2BHK Budget Apartment',
      location: 'Dwarka',
      bedrooms: 2,
      bathrooms: 1,
      area: 1200,
      isFavorited: false,
    },
    {
      id: 5,
      image: Img,
      agentName: 'Pooja Aru',
      agentImage: 'https://via.placeholder.com/40',
      title: '2BHK Budget Apartment',
      location: 'Dwarka',
      bedrooms: 2,
      bathrooms: 1,
      area: 1200,
      isFavorited: false,
    },
  ];

  return (
    <Router>
      <Navbar />
      {showModal && <ContactModal onClose={() => setShowModal(false)} />}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <div style={{ textAlign: 'center', margin: '3rem 0' }}>
  <h2 style={{
    fontSize: '2.5rem',
    fontWeight: '800',
    color: '#1f2937',
    position: 'relative',
    display: 'inline-block'
  }}>
    <span style={{ position: 'relative', display: 'inline-block', marginRight: '6px' }}>
      
      {/* Large Box */}
      <span style={{
        position: 'absolute',
        top: '-15px',
        left: '-10px',
        width: '60px',
        height: '60px',
        backgroundColor: '#b80000',
        borderRadius: '6px',
        zIndex: -2,
        
      }}></span>

      {/* Small Box */}
      <span style={{
        position: 'absolute',
        top: '-30px',
        left: '28px',
        width: '30px',
        height: '30px',
        backgroundColor: '#b80000',
        border:'1px solid white',
        borderRadius: '6px',
        zIndex: -1,
        
      }}></span>

      Builder
    </span>
     Floor For Sale
  </h2>

  <p style={{
  fontSize: '1.125rem',
  color: '#323233ff',
  maxWidth: '600px',
  margin: '0.5rem auto 0',
  textAlign: 'center',
}}>
  Find Your <span style={{
    position: 'relative',
    display: 'inline-block',
    color: '#323233ff'
  }}>
    Perfect Home with a Trusted Real
    <span style={{
      position: 'absolute',
      left: 0,
      bottom: -16,
      width: '100%',
      height: '3px',
      backgroundColor: '#b80000',
      borderRadius: '2px',
    }}></span>
  </span> Estate Agent
</p>


</div>


              <div className="card-grid">
                {properties.map((property) => (
                  <HomeCard key={property.id} {...property} />
                ))}
              </div>
              <CategorySection />
            </>
          }
        />
        <Route path="/property/:id" element={<PropertyDetails properties={properties} />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>


      <Footer />
    </Router>
  );
};

export default App;
