// src/components/AdminSidebar.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import {
    FaHome,
    FaUserTie,
    FaEnvelope,
    FaBars,
    FaExternalLinkAlt,
    FaSignOutAlt,
    FaPlus,
} from 'react-icons/fa';
import { toast } from 'react-toastify';

const SidebarContainer = styled.div`
  position: relative;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: ${({ mobileOpen }) => (mobileOpen ? '0' : '-220px')};
    height: 100%;
    z-index: 1001;
    transition: left 0.3s ease;
    width: 220px;
  }
`;

const Overlay = styled.div`
  display: ${({ mobileOpen }) => (mobileOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const Sidebar = styled.div`
  width: ${({ collapsed }) => (collapsed ? '60px' : '220px')};
  height: 100vh;
  background-color: #1e293b;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 1rem 0.5rem;
  transition: width 0.3s ease;

  @media (max-width: 768px) {
    width: 220px; /* Mobile me fixed width */
  }
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.3rem;
  cursor: pointer;
  padding: 0.6rem;
  align-self: ${({ collapsed }) => (collapsed ? 'center' : 'flex-end')};

  @media (max-width: 768px) {
    position: fixed;
    top: 1rem;
    left: 1rem;
    z-index: 1100;
    background-color: #1e293b;
    border-radius: 5px;
  }
`;

const SidebarTitle = styled.h2`
  margin: 1rem 0;
  font-size: 1.39em;
  color: #facc15;
  text-align: center;
  display: ${({ collapsed }) => (collapsed ? 'none' : 'block')};

  @media (max-width: 768px) {
    display: block;
  }
`;

const LinksWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const BottomWrapper = styled.div`
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid #334155;
`;

const SidebarLink = styled(NavLink)`
  color: #e2e8f0;
  margin: 0.25rem 0;
  text-decoration: none;
  font-size: 1rem;
  padding: 0.6rem 0.75rem;
  border-radius: 0.4rem;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;

  &.active {
    background-color: #334155;
    font-weight: bold;
  }

  &:hover {
    background-color: #334155;
    color: #38bdf8;
  }
`;

const ExternalLink = styled.a`
  color: #e2e8f0;
  margin: 0.25rem 0;
  text-decoration: none;
  font-size: 1rem;
  padding: 0.6rem 0.75rem;
  border-radius: 0.4rem;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;

  &:hover {
    background-color: #334155;
    color: #38bdf8;
  }
`;

const IconWrapper = styled.div`
  margin-right: ${({ collapsed }) => (collapsed ? '0' : '0.75rem')};
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
`;

const DashboardSidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            {isMobile && (
                <ToggleButton
                    onClick={() => setMobileOpen(!mobileOpen)}
                    title="Toggle Menu"
                >
                    <FaBars />
                </ToggleButton>
            )}

            {isMobile && <Overlay mobileOpen={mobileOpen} onClick={() => setMobileOpen(false)} />}

            <SidebarContainer mobileOpen={mobileOpen}>
                <Sidebar collapsed={collapsed && !isMobile}>
                    {!isMobile && (
                        <ToggleButton
                            onClick={() => setCollapsed(!collapsed)}
                            collapsed={collapsed}
                            title="Toggle Menu"
                        >
                            <FaBars />
                        </ToggleButton>
                    )}

                    <SidebarTitle collapsed={collapsed && !isMobile}>Admin Panel</SidebarTitle>

                    <LinksWrapper>
                        <SidebarLink to="/admin/dashboard" onClick={() => setMobileOpen(false)}>
                            <IconWrapper collapsed={collapsed && !isMobile}>
                                <FaHome />
                            </IconWrapper>
                            {(!collapsed || isMobile) && 'Dashboard'}
                        </SidebarLink>

                        <SidebarLink to="/admin/properties" onClick={() => setMobileOpen(false)}>
                            <IconWrapper collapsed={collapsed && !isMobile}>
                                <FaHome />
                            </IconWrapper>
                            {(!collapsed || isMobile) && 'Manage Properties'}
                        </SidebarLink>

                        <SidebarLink to="/admin/add-property" onClick={() => setMobileOpen(false)}>
                            <IconWrapper collapsed={collapsed && !isMobile}>
                                <FaPlus />
                            </IconWrapper>
                            {(!collapsed || isMobile) && 'Add Property'}
                        </SidebarLink>

                        <SidebarLink to="/admin/edit-property" onClick={() => setMobileOpen(false)}>
                            <IconWrapper collapsed={collapsed && !isMobile}>
                                <FaPlus />
                            </IconWrapper>
                            {(!collapsed || isMobile) && 'Edit Property'}
                        </SidebarLink>

                        <SidebarLink to="/admin/agents" onClick={() => setMobileOpen(false)}>
                            <IconWrapper collapsed={collapsed && !isMobile}>
                                <FaUserTie />
                            </IconWrapper>
                            {(!collapsed || isMobile) && 'Broker'}
                        </SidebarLink>

                        <SidebarLink to="/admin/buyer" onClick={() => setMobileOpen(false)}>
                            <IconWrapper collapsed={collapsed && !isMobile}>
                                <FaUserTie />
                            </IconWrapper>
                            {(!collapsed || isMobile) && 'Buyer'}
                        </SidebarLink>

                        <SidebarLink to="/admin/seller" onClick={() => setMobileOpen(false)}>
                            <IconWrapper collapsed={collapsed && !isMobile}>
                                <FaUserTie />
                            </IconWrapper>
                            {(!collapsed || isMobile) && 'Seller'}
                        </SidebarLink>

                        <SidebarLink to="/admin/messages" onClick={() => setMobileOpen(false)}>
                            <IconWrapper collapsed={collapsed && !isMobile}>
                                <FaEnvelope />
                            </IconWrapper>
                            {(!collapsed || isMobile) && 'Messages'}
                        </SidebarLink>

                        <ExternalLink
                            href="/"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setMobileOpen(false)}
                        >
                            <IconWrapper collapsed={collapsed && !isMobile}>
                                <FaExternalLinkAlt />
                            </IconWrapper>
                            {(!collapsed || isMobile) && 'Go to Site'}
                        </ExternalLink>
                    </LinksWrapper>

                    <BottomWrapper>
                        <SidebarLink
                            as="div"
                            onClick={() => {
                                localStorage.removeItem('auth_token');
                                sessionStorage.clear();
                                toast.success('Logged out successfully!', { autoClose: 2000 });
                                setTimeout(() => {
                                    window.location.href = '/admin';
                                }, 2000);
                            }}
                        >
                            <IconWrapper collapsed={collapsed && !isMobile}>
                                <FaSignOutAlt />
                            </IconWrapper>
                            {(!collapsed || isMobile) && 'Logout'}
                        </SidebarLink>
                    </BottomWrapper>
                </Sidebar>
            </SidebarContainer>
        </>
    );
};

export default DashboardSidebar;
