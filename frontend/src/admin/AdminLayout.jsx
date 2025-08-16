import React from 'react';
import DashboardSidebar from '../components/DashboardSidebar';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const LayoutWrapper = styled.div`
  display: flex;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  flex: 1;
  padding: 2rem;
  background-color: #f1f5f9;
  overflow: auto; /* Enable both horizontal and vertical scrolling */
  max-height: 100vh; /* Ensure content doesn't overflow vertically */
  box-sizing: border-box; /* Prevent padding from causing layout issues */
  
  /* Ensure content doesn't shrink too much on smaller screens */
  @media (max-width: 768px) {
    padding: 1rem; /* Adjust padding for mobile */
    max-height: calc(100vh - 60px); /* Account for mobile header or toggle button */
  }
`;

const AdminLayout = () => {
  return (
    <LayoutWrapper>
      <DashboardSidebar />
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
    </LayoutWrapper>
  );
};

export default AdminLayout;