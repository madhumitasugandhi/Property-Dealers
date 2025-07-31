// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { FaUserCircle, FaChevronDown } from 'react-icons/fa'

const NavbarContainer = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 1000;
  background-color: ${({ isScrolled }) => (isScrolled ? '#005ca8' : 'transparent')};
  box-shadow: ${({ isScrolled }) => (isScrolled ? '0 2px 4px rgba(0,0,0,0.1)' : 'none')};
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  overflow-x: hidden;
  box-sizing: border-box;
`

const NavContainer = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
`

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const Logo = styled.div`
  background-color: #005ca8;
  color: white;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.4rem;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
`

const TalukaSelect = styled.select`
  padding: 0.4rem 0.6rem;
  background: transparent;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  font-size: 0.95rem;
  cursor: pointer;

  option {
    background: #005ca8;
    color: #fff;
  }
`

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`

const NavList = styled.ul`
  display: flex;
  align-items: center;
  gap: 1rem;
  list-style: none;
  color: white;
  font-size: 1rem;
  font-weight: 500;
  margin: 0;
  padding: 0;
  li {
    position: relative;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    &:hover {
      color: #00ccff;
    }
  }
  @media (max-width: 1024px) {
    display: none;
  }
`

const DropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  background: #ffffff;
  list-style: none;
  padding: 0.5rem 0;
  border-radius: 6px;
  display: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  min-width: 140px;
  li {
    padding: 0.5rem 1rem;
    white-space: nowrap;
    color: #333;
    transition: background 0.3s ease, color 0.3s ease;
    &:hover {
      background: #00ccff;
      color: #fff;
    }
  }
`

const NavItem = styled.li`
  &:hover ${DropdownMenu} {
    display: block;
  }
`

const ContactButton = styled.div`
  background-color: #005ca8;
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 1rem;
  white-space: nowrap;
  @media (max-width: 1024px) {
    display: none;
  }
`

const MenuIcon = styled.div`
  font-size: 1.8rem;
  cursor: pointer;
  color: white;
  display: none;
  margin-left: 1rem;
  @media (max-width: 1024px) {
    display: block;
  }
`

const MobileMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100vw;
  background-color: white;
  display: ${({ open }) => (open ? 'flex' : 'none')};
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 2rem;
  font-weight: 600;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 999;
  a {
    text-decoration: none;
    color: black;
  }
`

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <NavbarContainer
      isScrolled={isScrolled}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <NavContainer>
        <LeftSection>
          <a href="/" style={{ textDecoration: 'none' }}>
            <Logo>YAVATMAL</Logo>
          </a>
          <TalukaSelect>
            <option>Taluka</option>
            <option>Arni</option>
            <option>Umarkhed</option>
            <option>Kalamb</option>
            <option>Pandharkawada</option>
            <option>Ghatanji</option>
            <option>Zari-Jamni</option>
            <option>Darwha</option>
            <option>Digras</option>
            <option>Ner</option>
            <option>Pusad</option>
            <option>Babhulgaon</option>
            <option>Mahagaon</option>
            <option>Maregaon</option>
            <option>Yavatmal</option>
            <option>Ralegaon</option>
            <option>Wani</option>
          </TalukaSelect>
        </LeftSection>
        <RightSection>
          <NavList>
            <li>Home</li>
            <NavItem>
              Properties <FaChevronDown size={12} />
              <DropdownMenu>
                <li>Buy</li>
                <li>Sell</li>
              </DropdownMenu>
            </NavItem>
            <li>Services</li>
            <li>About</li>
            <li>Contact</li>
            <NavItem>
              <FaUserCircle size={20} /> <FaChevronDown size={12} />
              <DropdownMenu>
                <li>Login</li>
                <li>Register</li>
              </DropdownMenu>
            </NavItem>
          </NavList>
          <ContactButton>+91 976 555 0608</ContactButton>
          <MenuIcon onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? '✖' : '☰'}
          </MenuIcon>
        </RightSection>
      </NavContainer>
      <MobileMenu open={menuOpen}>
        <a href="/">HOME</a>
        <a href="#">PROPERTIES</a>
        <a href="#">SERVICES</a>
        <a href="/about">ABOUT</a>
        <a href="/contact">CONTACT</a>
        <a href="tel:+919765550608">+91 976 555 0608</a>
      </MobileMenu>
    </NavbarContainer>
  )
}

export default Navbar
