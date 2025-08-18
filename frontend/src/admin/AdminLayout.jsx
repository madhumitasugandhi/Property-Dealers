import React from 'react';
import DashboardSidebar from '../components/DashboardSidebar';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const LayoutWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  box-sizing: border-box;
`;

const ContentWrapper = styled.div`
  flex: 1;
  padding: 2rem;
  background-color: #f1f5f9;
  overflow: auto; /* Enable both horizontal and vertical scrolling */
  max-height: 100vh; /* Ensure content doesn't overflow vertically */
  min-height: 100vh; /* Ensure full viewport height */
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 1rem;
    max-height: calc(100vh - 60px); /* Adjust for mobile header */
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
    max-height: calc(100vh - 50px); /* Further adjust for smaller screens */
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