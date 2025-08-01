import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FaUserCircle, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

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

  @media (max-width: 768px) {
    gap: 1rem;
  }

  @media (max-width: 480px) {
    gap: 0.75rem;
  }
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: white;

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

const TalukaDropdown = styled.div`
  position: relative;
  cursor: pointer;
  font-weight: bold;
  color: white;
  display: flex;
  align-items: center;
  gap: 0.25rem;

  &:hover > ul {
    display: block;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    &:hover > ul {
      display: none;
    }
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const Hamburger = styled.div`
  display: none;
  font-size: 24px;
  cursor: pointer;
  color: white;

  @media (max-width: 768px) {
    display: block;
    color: ${({ scrolled }) => (scrolled ? '#fff' : '#000')};
  }

  @media (max-width: 480px) {
    font-size: 20px;
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

  @media (max-width: 480px) {
    top: 60px;
    padding: 15px 0;
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

  a {
    color: white;
    text-decoration: none;
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    font-size: 14px;

    a {
      color: #fff;
    }

    &:hover > ul {
      display: none;
    }
  }

  @media (max-width: 480px) {
    font-size: 12px;
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
  color: ${({ scrolled }) => (scrolled ? '#fff' : '#000')};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 8px 0;
  border-radius: 8px;
  display: ${({ show }) => (show ? 'block' : 'none')};
  min-width: 160px;
  max-width: 90vw;
  z-index: 1000;

  li {
    padding: 10px 20px;
    cursor: pointer;
    color: ${({ scrolled }) => (scrolled ? '#fff' : '#000')};

    &:hover {
      background: #005ca8;
      color: #fff;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
    border-radius: 0;

    li {
      padding: 10px 16px;
      text-align: center;
    }
  }

  @media (max-width: 480px) {
    li {
      padding: 8px 10px;
      font-size: 12px;
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
  color: ${({ scrolled }) => (scrolled ? '#fff' : '#000')};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  list-style: none;
  padding: 8px 0;
  border-radius: 8px;
  min-width: 160px;
  max-width: 90vw;
  display: ${({ show }) => (show ? 'block' : 'none')};
  z-index: 1000;

  li {
    padding: 10px 20px;
    cursor: pointer;
    color: ${({ scrolled }) => (scrolled ? '#fff' : '#000')};

    &:hover {
      background: #005ca8;
      color: #fff;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
    left: 0;
    right: 0;
    border-radius: 0;

    li {
      padding: 10px 16px;
      text-align: center;
    }
  }

  @media (max-width: 480px) {
    li {
      padding: 8px 10px;
      font-size: 12px;
    }
  }
`;

const StyledLink = styled(Link)`
    color: ${({ scrolled }) => (scrolled ? "#fff" : "#000")};
  text-decoration: none;
  padding: 10px 16px;
  display: block;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ scrolled }) =>
      scrolled
        ? "linear-gradient(90deg, #151c22 0%, #003e73 50%, #005ca8 100%)"
        : "#005ca8"};
    color: #fff;
  }


  @media (max-width: 768px) {
    padding: 10px 16px;
    text-align: center;
  }

  @media (max-width: 480px) {
    padding: 8px 10px;
    font-size: 12px;
  }
`;

const UserIcon = styled(FaUserCircle)`
  font-size: 24px;
  cursor: pointer;
  color: white;
  z-index: 1001;

  @media (max-width: 768px) {
    color: ${({ scrolled }) => (scrolled ? '#fff' : '#000')};
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

const Navbar = ({ onLoginClick, onRegisterClick }) => {
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

  const location = useLocation();
  useEffect(() => {
    setPropertyDropdown(false);
    setUserDropdown(false);
    setTalukaDropdown(false);
    setMenuOpen(false);
    console.log('Current route:', location.pathname); // Debug log
  }, [location]);

  return (
    <>
      <style>{`body { overflow-x: hidden; margin: 0; }`}</style>
      <NavbarContainer ref={navRef} scrolled={scrolled}>
        <LeftSection>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Logo>YAVATMAL</Logo>
          </Link>
          <TalukaDropdown
            onClick={() => {
              console.log('Taluka clicked, state:', !talukaDropdown); // Debug log
              setTalukaDropdown((prev) => !prev);
            }}
            onMouseEnter={() => {
              console.log('Taluka hover enter'); // Debug log
              setTalukaDropdown(true);
            }}
            onMouseLeave={() => {
              console.log('Taluka hover leave'); // Debug log
              setTalukaDropdown(false);
            }}
          >
            Select Taluka <FaChevronDown />
            <TalukaList show={talukaDropdown} scrolled={scrolled}>
              <li onClick={() => setTalukaDropdown(false)}>Arni</li>
              <li onClick={() => setTalukaDropdown(false)}>Umarkhed</li>
              <li onClick={() => setTalukaDropdown(false)}>Kalamb</li>
              <li onClick={() => setTalukaDropdown(false)}>Pandharkawada</li>
              <li onClick={() => setTalukaDropdown(false)}>Ghatanji</li>
              <li onClick={() => setTalukaDropdown(false)}>Zari-Jamni</li>
              <li onClick={() => setTalukaDropdown(false)}>Darwha</li>
              <li onClick={() => setTalukaDropdown(false)}>Digras</li>
              <li onClick={() => setTalukaDropdown(false)}>Ner</li>
              <li onClick={() => setTalukaDropdown(false)}>Pusad</li>
              <li onClick={() => setTalukaDropdown(false)}>Babhulgaon</li>
              <li onClick={() => setTalukaDropdown(false)}>Mahagaon</li>
              <li onClick={() => setTalukaDropdown(false)}>Maregaon</li>
              <li onClick={() => setTalukaDropdown(false)}>Yavatmal</li>
              <li onClick={() => setTalukaDropdown(false)}>Ralegaon</li>
              <li onClick={() => setTalukaDropdown(false)}>Wani</li>
            </TalukaList>
          </TalukaDropdown>
        </LeftSection>

        <Hamburger
          scrolled={scrolled}
          onClick={() => {
            console.log('Hamburger clicked, menuOpen:', !menuOpen); // Debug log
            setMenuOpen((prev) => !prev);
          }}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </Hamburger>

        <NavLinks isOpen={menuOpen} scrolled={scrolled}>
          <NavItem>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
              Home
            </Link>
          </NavItem>
         <NavItem
  onClick={() => {
    console.log('Properties clicked, state:', !propertyDropdown);
    setPropertyDropdown((prev) => !prev);
  }}
  onMouseEnter={() => {
    console.log('Properties hover enter');
    setPropertyDropdown(true);
  }}
  onMouseLeave={() => {
    console.log('Properties hover leave');
    setPropertyDropdown(false);
  }}
>
  Properties <FaChevronDown />
  <DropdownMenu show={propertyDropdown} scrolled={scrolled} style={{ color: '#000', background: '#fff' }}>
    <li>
      <StyledLink
        to="/buy"
        scrolled={false} // Force white background, black text
        style={{ color: '#000' }}
        onClick={() => setPropertyDropdown(false)}
      >
        Buy
      </StyledLink>
    </li>
    <li>
      <StyledLink
        to="/sell"
        scrolled={false}
        style={{ color: '#000' }}
        onClick={() => setPropertyDropdown(false)}
      >
        Sell
      </StyledLink>
    </li>
  </DropdownMenu>
</NavItem>

<NavItem>
  <Link to="/services" style={{ color: 'white', textDecoration: 'none' }}>
    Services
  </Link>
</NavItem>
<NavItem>
  <Link to="/About" style={{ color: 'white', textDecoration: 'none' }}>
    About
  </Link>
</NavItem>
<NavItem>
  <Link to="/contact" style={{ color: 'white', textDecoration: 'none' }}>
    Contact
  </Link>
</NavItem>

<NavItem>
  <Link to="/broker" style={{ color: 'white', textDecoration: 'none' }}>
    Broker
  </Link>
</NavItem>

<NavItem
  onClick={() => {
    console.log('UserIcon clicked, state:', !userDropdown);
    setUserDropdown((prev) => !prev);
  }}
  onMouseEnter={() => {
    console.log('UserIcon hover enter');
    setUserDropdown(true);
  }}
  onMouseLeave={() => {
    console.log('UserIcon hover leave');
    setUserDropdown(false);
  }}
>
  <UserIcon scrolled={scrolled} />
  <DropdownMenu show={userDropdown} alignRight scrolled={scrolled}>
    <li
      onClick={() => {
        onLoginClick();
        setUserDropdown(false);
      }}
    >
      Login
    </li>
    <li
      onClick={() => {
        onRegisterClick();
        setUserDropdown(false);
      }}
    >
      Register
    </li>
  </DropdownMenu>
</NavItem>
        </NavLinks>
      </NavbarContainer>
    </>
  );
};

export default Navbar;