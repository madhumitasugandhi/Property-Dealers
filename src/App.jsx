
import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
<<<<<<< HEAD
=======
import HomeCard from './components/HomeCard'
import Img from './assets/bg2.jpg'
>>>>>>> 12f6a09 (Home Cards created.)

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
      <Hero />
<<<<<<< HEAD
=======
      <HomeCard
        image={Img}
        agentName="Lalit Kaushik"
        agentImage="https://via.placeholder.com/40"
        title="4BHK Apartment For Sale In Vasant Vihar"
        location="Vasant Vihar"
        bedrooms={4}
        bathrooms={2}
        area={2300}
        isFavorited={true}
      />
>>>>>>> 12f6a09 (Home Cards created.)
    </>
  )
}

export default App;
