import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiMenu, FiX } from 'react-icons/fi';

const Nav = styled.nav`
  position: fixed;
  width: 100%;
  z-index: 999;
  top: 0;
  left: 0;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  background-color: ${({ isScrolled }) => (isScrolled ? '#b80000' : 'transparent')};
  box-shadow: ${({ isScrolled }) => (isScrolled ? '0 2px 4px rgba(0,0,0,0.1)' : 'none')};
`;



const NavContainer = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 1024px) {
    padding: 1rem;
  }
`;

const Logo = styled.div`
  background-color: #b80000;
  color: white;
  font-weight: bold;
  font-size: 1.4rem;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    padding: 0.3rem 0.6rem;
  }
`;

const Links = styled.div`
  display: flex;
  gap: 1.5rem;
  font-weight: 600;
  padding: 0.5rem 0.3rem;

  a {
    text-decoration: none;
    color: black;
  }

  @media (max-width: 1024px) {
    display: none;
  }
`;

const ContactButton = styled.div`
  background-color: #b80000;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 1rem;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const MenuIcon = styled.div`
  display: none;
  font-size: 1.8rem;
  cursor: pointer;
  color: black;

  @media (max-width: 1024px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: white;
  display: ${({ open }) => (open ? 'flex' : 'none')};
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 2rem;
  font-weight: 600;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);

  a {
    text-decoration: none;
    color: black;
  }
`;

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Nav isScrolled={isScrolled}>
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

        <MenuIcon onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </MenuIcon>
      </NavContainer>

      <MobileMenu open={menuOpen}>
        <a href="#">HOME</a>
        <a href="#">PROJECTS</a>
        <a href="#">UPDATES</a>
        <a href="#">EVENTS</a>
        <a href="#">ABOUT US</a>
        <a href="#">CONTACT</a>
        <a href="tel:+919765550608">+91 976 555 0608</a>
      </MobileMenu>
    </Nav>
  );
};

export default Navbar;
