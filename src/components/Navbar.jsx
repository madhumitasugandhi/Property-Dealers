import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FaUserCircle, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';

const NavbarContainer = styled.nav`
  background: ${({ scrolled }) => (scrolled ? 'linear-gradient(90deg, #151c22 0%, #003e73 50%, #005ca8 100%)' : 'transparent')};
  color: ${({ scrolled }) => (scrolled ? '#fff' : '#000')};
  padding: 10px 30px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: ${({ scrolled }) => (scrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none')};
  z-index: 999;
  position: fixed;
  top: 0;
  transition: background 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
`;


const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  color:white;
`;

const TalukaDropdown = styled.div`
  position: relative;
  cursor: pointer;
  font-weight: bold;

  &:hover > ul {
    display: block;
  }

  @media (max-width: 768px) {
    &:hover > ul {
      display: none;
    }
  }
`;


const Hamburger = styled.div`
  display: none;
  font-size: 24px;
  cursor: pointer;
  color: white;

  @media (max-width: 768px) {
    display: block;
  }
`;

const NavLinks = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  gap: 2rem;
  color: white;
  font-weight: bold;

  @media (max-width: 768px) {
    position: absolute;
    top: 70px;
    left: 0;
    width: 100%;
    flex-direction: column;
    padding: 20px 0;
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    gap: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    background: ${({ scrolled }) =>
      scrolled
        ? 'linear-gradient(90deg, #151c22 0%, #003e73 50%, #005ca8 100%)'
        : '#f4f0ec'};
    color: #fff;

    li {
      width: 100%;
      text-align: center;
      padding: 10px 0;
      color: #fff;

      &:hover {
        background: #fff;
        color: #000;
      }

      svg {
        color: #fff;
      }
    }
  }
`;


const NavItem = styled.li`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: white;

  &:hover > ul {
    display: block;
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;

    &:hover > ul {
      display: none;
    }
  }
`;

const TalukaList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  list-style: none;
  background: ${({ scrolled }) =>
    scrolled
      ? 'linear-gradient(90deg, #151c22 0%, #003e73 50%, #005ca8 100%)'
      : '#fff'};
  color: ${({ scrolled }) => (scrolled ? '#000' : '#fff')};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 8px 0;
  border-radius: 8px;
  display: none;
  min-width: 160px;
  z-index: 100;

  li {
    padding: 10px 20px;
    cursor: pointer;
    color: ${({ scrolled }) => (scrolled ? '#fff' : '#000')};

    &:hover {
      background: ${({ scrolled }) =>
        scrolled
          ? 'linear-gradient(90deg, #151c22 0%, #003e73 50%, #005ca8 100%)'
          : '#005ca8'};
      color: #fff;
    }
  }
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  right: ${({ alignRight }) => (alignRight ? '0' : 'auto')};
  left: ${({ alignRight }) => (alignRight ? 'auto' : '0')};
  background: ${({ scrolled }) =>
    scrolled
      ? 'linear-gradient(90deg, #151c22 0%, #003e73 50%, #005ca8 100%)'
      : '#fff'};
  color: ${({ scrolled }) => (scrolled ? '#000' : '#000')};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  list-style: none;
  padding: 8px 0;
  border-radius: 8px;
  min-width: 160px;
  display: ${({ show }) => (show ? 'block' : 'none')};
  z-index: 100;

  li {
    padding: 10px 20px;
    cursor: pointer;
    color: ${({ scrolled }) => (scrolled ? '#fff' : '#000')};

    &:hover {
      background: ${({ scrolled }) =>
        scrolled
          ? 'linear-gradient(90deg, #151c22 0%, #003e73 50%, #005ca8 100%)'
          : '#005ca8'};
      color: #fff;
    }
  }
`;

const UserIcon = styled(FaUserCircle)`
  font-size: 24px;
  cursor: pointer;
`;

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [propertyDropdown, setPropertyDropdown] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [talukaDropdown, setTalukaDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setPropertyDropdown(false);
        setUserDropdown(false);
        setTalukaDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 100); 
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <NavbarContainer ref={navRef} scrolled={scrolled}>
      <LeftSection>
        <a href="/" style={{  textDecoration: 'none'}}><Logo>YAVATMAL</Logo></a>
        <TalukaDropdown style={{ color: 'white' }}
          onClick={() => setTalukaDropdown((prev) => !prev)}
        >
          Select Taluka <FaChevronDown />
          <TalukaList scrolled={scrolled} style={{ display: talukaDropdown ? 'block' : 'none' }}>
          
            <li>Arni</li>
            <li>Umarkhed</li>
            <li>Kalamb</li>
            <li>Pandharkawada</li>
            <li>Ghatanji</li>
            <li>Zari-Jamni</li>
            <li>Darwha</li>
            <li>Digras</li>
            <li>Ner</li>
            <li>Pusad</li>
            <li>Babhulgaon</li>
            <li>Mahagaon</li>
            <li>Maregaon</li>
            <li>Yavatmal</li>
            <li>Ralegaon</li>
            <li>Wani</li>
          </TalukaList>
        </TalukaDropdown>
      </LeftSection>

      <Hamburger onClick={() => setMenuOpen((prev) => !prev)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </Hamburger>

      <NavLinks isOpen={menuOpen} scrolled={scrolled}>
        <NavItem><a href="/" style={{ color: 'white' , textDecoration: 'none'}}>Home</a></NavItem>
        <NavItem onClick={() => setPropertyDropdown(!propertyDropdown)}>
          Properties <FaChevronDown />
          <DropdownMenu show={propertyDropdown} scrolled={scrolled}>
            <li>Buy</li>
            <li>Sell</li>
          </DropdownMenu>
        </NavItem>
        <NavItem>Services</NavItem>
        <NavItem><a href="/About" style={{ color: 'white', textDecoration: 'none'}}>About</a></NavItem>
        <NavItem><a href="/ContactUs" style={{ color: 'white', textDecoration: 'none'}}>Contact</a></NavItem>
        <NavItem onClick={() => setUserDropdown(!userDropdown)}>
          <UserIcon />
          <DropdownMenu show={userDropdown} alignRight scrolled={scrolled}>
            <li>Login</li>
            <li>Register</li>
          </DropdownMenu>
        </NavItem>
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;
