
import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
<<<<<<< HEAD
=======
import HomeCard from './components/HomeCard'
import Img from './assets/bg2.jpg'
>>>>>>> 12f6a09 (Home Cards created.)

const App = () => {
  return (
    <>
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

export default App
