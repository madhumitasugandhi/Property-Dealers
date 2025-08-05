// src/components/AdminSidebar.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import {
    FaTachometerAlt,
    FaHome,
    FaUserTie,
    FaEnvelope,
    FaCog,
    FaBars,
    FaExternalLinkAlt,
    FaSignOutAlt,
    FaPlus,
} from 'react-icons/fa';
import { toast } from 'react-toastify';

const SidebarContainer = styled.div`
  position: relative;
  @media (max-width: 768px) {
    position: absolute;
    z-index: 999;
  }
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
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.3rem;
  cursor: pointer;
  padding: 0.6rem;
  align-self: ${({ collapsed }) => (collapsed ? 'center' : 'flex-end')};
`;

const SidebarTitle = styled.h2`
  margin: 1rem 0;
  font-size: 1.39em;
  color: #facc15;
  text-align: center;
  display: ${({ collapsed }) => (collapsed ? 'none' : 'block')};
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

    return (
        <SidebarContainer>
            <Sidebar collapsed={collapsed}>
                <ToggleButton
                    onClick={() => setCollapsed(!collapsed)}
                    collapsed={collapsed}
                    title="Toggle Menu"
                >
                    <FaBars />
                </ToggleButton>
                <SidebarTitle collapsed={collapsed}>Admin Panel</SidebarTitle>

                <LinksWrapper>

                    <SidebarLink to="/admin/properties">
                        <IconWrapper collapsed={collapsed}>
                            <FaHome />
                        </IconWrapper>
                        {!collapsed && 'Manage Properties'}
                    </SidebarLink>



                    <SidebarLink to="/admin/add-property">
                        <IconWrapper collapsed={collapsed}>
                            <FaPlus />
                        </IconWrapper>
                        {!collapsed && 'Add Property'}
                    </SidebarLink>


                    <SidebarLink to="/admin/agents">
                        <IconWrapper collapsed={collapsed}>
                            <FaUserTie />
                        </IconWrapper>
                        {!collapsed && 'Agents'}
                    </SidebarLink>

                    <SidebarLink to="/admin/messages">
                        <IconWrapper collapsed={collapsed}>
                            <FaEnvelope />
                        </IconWrapper>
                        {!collapsed && 'Messages'}
                    </SidebarLink>

                    <ExternalLink href="/" target="_blank" rel="noopener noreferrer">
                        <IconWrapper collapsed={collapsed}>
                            <FaExternalLinkAlt />
                        </IconWrapper>
                        {!collapsed && 'Go to Site'}
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
                        <IconWrapper collapsed={collapsed}>
                            <FaSignOutAlt />
                        </IconWrapper>
                        {!collapsed && 'Logout'}
                    </SidebarLink>

                </BottomWrapper>
            </Sidebar>
        </SidebarContainer>
    );
};

export default DashboardSidebar;
