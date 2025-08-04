import React from 'react';
import styled from 'styled-components';
import DashboardSidebar from '../components/DashboardSidebar'; // make sure this exists

const DashboardLayout = styled.div`
  display: flex;
  min-height: 100vh;
`;

const DashboardWrapper = styled.div`
  flex: 1;
  padding: 2rem;
  background-color: #f1f5f9;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #0f172a;
  margin-bottom: 2rem;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
`;

const StatCard = styled.div`
  background-color: #fff;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  justify-content: center;

  h3 {
    font-size: 1.2rem;
    color: #1e293b;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1.8rem;
    color: #0f172a;
    font-weight: bold;
  }
`;

const AdminDashboard = () => {
  return (
    <DashboardLayout>
      <DashboardWrapper>
        <Title>Admin Dashboard</Title>
        <CardContainer>
          <StatCard>
            <h3>Listed Properties</h3>
            <p>78</p>
          </StatCard>
          <StatCard>
            <h3>Pending Approvals</h3>
            <p>5</p>
          </StatCard>
          <StatCard>
            <h3>Messages</h3>
            <p>12</p>
          </StatCard>
        </CardContainer>
      </DashboardWrapper>
    </DashboardLayout>
  );
};

export default AdminDashboard;
