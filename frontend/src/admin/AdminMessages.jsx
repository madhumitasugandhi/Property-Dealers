import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  max-width: 1200px;
  margin: 50px auto;
  padding: 20px;
`;
const NavBar = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  font-size: 1rem;
  color: #333;

  a {
    text-decoration: none;
    color: #005ca8;
    font-weight: 500;
    padding: 5px 10px;
    border-radius: 4px;
    transition: all 0.3s ease;

    &:hover {
      background-color: #f0f0f0;
      color: #003d73;
    }

    &.active {
      background-color: #005ca8;
      color: white;
    }

    &:after {
      content: '/';
      margin-left: 10px;
      color: #666;
    }

    &:last-child:after {
      content: '';
    }
  }
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const MessageList = styled.ul`
  list-style: none;
  padding: 0;
`;

const MessageItem = styled.li`
  border: 1px solid #ccc;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 6px;
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/contact');
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setMessages(data);
          setError(null);
        } else {
          throw new Error('API did not return an array');
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
        setError(error.message || 'Failed to load messages. Please try again later.');
        setMessages([]);
      }
    };
    fetchMessages();
  }, []);

  return (
    <Container>
      <Title>Contact Form Messages</Title>
      <NavBar>
        <a href="#" onClick={() => navigate('/admin/dashboard')}>Dashboard</a>
        <a href="#" onClick={() => navigate('/admin/messages')}>Message</a>
      </NavBar>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {messages.length === 0 && !error ? (
        <p>No messages available.</p>
      ) : (
        <MessageList>
          {messages.map((message) => (
            <MessageItem key={message.id}>
              <p><strong>Name:</strong> {message.name}</p>
              <p><strong>Phone:</strong> {message.phone}</p>
              <p><strong>Flats:</strong> {message.flats?.join(', ') || 'None'}</p>
              <p><strong>Preferred Locations:</strong> {message.preferredLocations?.join(', ') || 'None'}</p>
              <p><strong>Requirements:</strong> {message.requirements || 'N/A'}</p>
              <p><strong>Submitted At:</strong> {new Date(message.createdAt).toLocaleString()}</p>
            </MessageItem>
          ))}
        </MessageList>
      )}
    </Container>
  );
};

export default AdminMessages;