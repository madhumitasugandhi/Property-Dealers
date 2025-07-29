import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HomeCard from './components/HomeCard';
import PropertyDetails from './components/PropertyDetails'; // create this next
import Img from './assets/bg2.jpg';
import './App.css';
import Footer from './components/Footer';
import CategorySection from './components/CategorySection';

const App = () => {
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
];


  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <div className="card-grid">
                {properties.map((property) => (
                  <HomeCard key={property.id} {...property} />
                ))}
              </div>
              <CategorySection/>
            </>
          }
        />
        <Route path="/property/:id" element={<PropertyDetails properties={properties} />} />
       
      </Routes>
      
      <Footer/>
    </Router>
  );
};

export default App;