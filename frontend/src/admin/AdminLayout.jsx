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
