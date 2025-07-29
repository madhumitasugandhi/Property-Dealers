// src/components/Navbar.jsx
import React from 'react'
import styled from 'styled-components'

const Nav = styled.nav`
  
  position: fixed;
  width: 100%;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`

const NavContainer = styled.div`

  max-width: 1200px;
  margin: auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Logo = styled.div`
  background-color: #b80000;
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
`

const Links = styled.div`
  background-color: white;
  display: flex;
  gap: 1.5rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  a {
    text-decoration: none;
    color: black;
  }

  @media (max-width: 768px) {
    display: none;
  }
`

const ContactButton = styled.div`
  background-color: #b80000;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: bold;
  font-weight: 600;
  font-size: 1.2rem;
`

const Navbar = () => {
  return (
    <Nav>
      <NavContainer>
        <Logo>SDPL AASHRAY</Logo>
        <Links>
          <a href="#">HOME</a>
          <a href="#">PROJECTS</a>
          <a href="#">UPDATES</a>
          <a href="#">EVENTS</a>
          <a href="#">ABOUT US</a>
          <a href="#">CONTACT</a>
        </Links>
        <ContactButton>+91 976 555 0608</ContactButton>
      </NavContainer>
    </Nav>
  )
}

export default Navbar
