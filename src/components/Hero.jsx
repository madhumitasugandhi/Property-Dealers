// src/components/Hero.jsx
import React from 'react'
import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { motion } from 'framer-motion'
import 'swiper/css'

import logoImg from '../assets/logo.jpeg'
import img1 from '../assets/building.jpeg'
import img2 from '../assets/bg2.jpg'
import img3 from '../assets/bg3.jpeg'
import img4 from '../assets/bg4.jpeg'

const Section = styled.section`
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  font-family: 'Poppins', sans-serif;
`

const Carousel = styled(Swiper)`
  width: 100%;
  height: 100%;
  .swiper-slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const DiagonalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 60%;
  height: 100%;
  background-color: rgba(184, 0, 0, 0.75); /* adjust as needed */
  clip-path: polygon(0 0, 100% 0, 70% 100%, 0% 100%);
  z-index: 1;

  @media (max-width: 768px) {
    width: 100%;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
  }
`


const Content = styled(motion.div)`
  position: absolute;
  z-index: 2;
  top: 0;
  left: 8%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
  max-width: 500px;

  @media (max-width: 768px) {
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    align-items: center;
    padding: 2rem 1rem;
  }
`


const LogoCircle = styled.div`
  background: white;
  border-radius: 50%;
  width: 130px;
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-bottom: 1.5rem;
`



const LogoImage = styled.img`
  width: 100%;
  height: auto;
`

const SubHeading = styled(motion.p)`
  font-size: 1.2rem;
  font-weight: 400;
  margin-bottom: 0.3rem;
`

const Heading = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 0.3rem;
`

const InfoText = styled(motion.p)`
  font-size: 1.3rem;
  font-weight: 400;
`

const CTAButton = styled(motion.button)`
  background: white;
  color: #b80000;
  font-weight: 600;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
`

const ArrowWrapper = styled(motion.div)`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  opacity: 0.8;

  svg {
    width: 36px;
    height: 36px;
    fill: white;
  }
`


const Hero = () => {
  return (
    <Section>
      {/* Image Slider */}
      <Carousel
        modules={[Autoplay]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        spaceBetween={0}
        slidesPerView={1}
      >
        {[img1, img2, img3, img4].map((img, i) => (
          <SwiperSlide key={i}><img src={img} alt={`Slide ${i}`} /></SwiperSlide>
        ))}
      </Carousel>

      {/* Diagonal Transparent Red */}
      <DiagonalOverlay />

      {/* Text Content */}
      <Content
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <LogoCircle>
          <LogoImage src={logoImg} alt="Logo" />
        </LogoCircle>

        <SubHeading
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          Discover Your Dream
        </SubHeading>

        <Heading
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
        >
          AFFORDABLE
        </Heading>

        <InfoText
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          1 & 2 BHK HOMES
        </InfoText>

        <CTAButton
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          at 5 Different Location
        </CTAButton>
      </Content>

      {/* Scroll Down Bouncing Arrow */}
      <ArrowWrapper
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 16.5l-6-6h12l-6 6z" />
        </svg>
      </ArrowWrapper>
    </Section>
  )
}

export default Hero
