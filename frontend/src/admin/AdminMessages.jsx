import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const Container = styled.div`
  padding: 20px;
`;

const NavBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  font-size: 1rem;
  color: #333;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 10px;

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

const Filters = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.9rem;
`;

const DateRangeWrapper = styled.div`
  position: relative;

  .rdrDateRangePickerWrapper {
    position: absolute;
    z-index: 1000;
    top: 100%;
    right: 0;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const DateRangeButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
  font-size: 0.9rem;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const TableContainer = styled.div`
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
`;

const Th = styled.th`
  padding: 12px;
  background-color: #005ca8;
  color: white;
  text-align: left;
  font-weight: 600;
  font-size: 1rem;
  border-bottom: 2px solid #ddd;
  &:nth-child(1) { min-width: 60px; max-width: 60px; } /* SRNo */
  &:nth-child(2) { min-width: 200px; } /* Subject */
  &:nth-child(3) { min-width: 120px; } /* Sender */
  &:nth-child(4) { min-width: 120px; } /* Action */
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
  text-align: left;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 0.85rem;
  }
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin: 0 5px;
  color: #005ca8;
  transition: color 0.3s ease;

  &:hover {
    color: #003d73;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  margin: 20px 0;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
`;

const ModalHeader = styled.h3`
  margin: 0 0 20px;
  font-size: 1.5rem;
  color: #333;
`;

const ModalBody = styled.div`
  margin-bottom: 20px;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
`;

const CloseButton = styled(Button)`
  background: #ccc;
  color: #333;
`;

const UpdateButton = styled(Button)`
  background: #005ca8;
  color: white;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  margin-top: 5px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  margin-top: 5px;
  resize: vertical;
`;

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [error, setError] = useState(null);
  const [viewModal, setViewModal] = useState(null);
  const [editModal, setEditModal] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', phone: '', message: '', status: '', followupdate: '' });
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateRange, setDateRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: 'selection',
    },
  ]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/contact');
        const contentType = response.headers.get('content-type');
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! Status: ${response.status}, Response: ${errorText.slice(0, 200)}...`);
        }
        if (!contentType || !contentType.includes('application/json')) {
          const errorText = await response.text();
          throw new Error(`Expected JSON, but received ${contentType}: ${errorText.slice(0, 200)}...`);
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setMessages(data);
          setFilteredMessages(data);
          setError(null);
        } else {
          throw new Error('API did not return an array');
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
        setError(error.message || 'Failed to load messages. Please try again later.');
        setMessages([]);
        setFilteredMessages([]);
        toast.error(error.message || 'Failed to load messages.');
      }
    };
    fetchMessages();
  }, []);

  useEffect(() => {
    let filtered = messages;
    
    if (statusFilter !== 'All') {
      filtered = filtered.filter((msg) => msg.status === statusFilter);
    }

    if (dateRange[0].startDate && dateRange[0].endDate) {
      const start = new Date(dateRange[0].startDate);
      const end = new Date(dateRange[0].endDate);
      filtered = filtered.filter((msg) => {
        if (!msg.followupdate) return false;
        const followDate = new Date(msg.followupdate);
        return followDate >= start && followDate <= end;
      });
    }

    setFilteredMessages(filtered);
  }, [statusFilter, dateRange, messages]);

  const handleView = (message) => {
    setViewModal(message);
  };

  const handleEdit = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/contact/${id}`);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, Response: ${errorText.slice(0, 200)}...`);
      }
      const data = await response.json();
      setEditForm({
        name: data.name,
        phone: data.phone,
        message: data.message || '',
        status: data.status,
        followupdate: data.followupdate || ''
      });
      setEditModal(data);
    } catch (error) {
      console.error('Error fetching contact for edit:', error);
      setError(error.message || 'Failed to load contact for editing.');
      toast.error(error.message || 'Failed to load contact for editing.');
    }
  };

  const handleUpdate = async () => {
    try {
      if (!editForm.name || !editForm.phone) {
        toast.error('Name and phone are required');
        return;
      }
      const response = await fetch(`http://localhost:5000/api/contact/${editModal.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, Response: ${errorText.slice(0, 200)}...`);
      }
      setMessages(messages.map((msg) => (msg.id === editModal.id ? { ...msg, ...editForm } : msg)));
      setFilteredMessages(filteredMessages.map((msg) => (msg.id === editModal.id ? { ...msg, ...editForm } : msg)));
      setEditModal(null);
      toast.success('Contact updated successfully');
    } catch (error) {
      console.error('Error updating contact:', error);
      setError(error.message || 'Failed to update contact.');
      toast.error(error.message || 'Failed to update contact.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/contact/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! Status: ${response.status}, Response: ${errorText.slice(0, 200)}...`);
        }
        setMessages(messages.filter((message) => message.id !== id));
        setFilteredMessages(filteredMessages.filter((message) => message.id !== id));
        toast.success('Message deleted successfully');
      } catch (error) {
        console.error('Error deleting message:', error);
        setError(error.message || 'Failed to delete message.');
        toast.error(error.message || 'Failed to delete message.');
      }
    }
  };

  return (
    <Container>
      <Title>Contact Form Messages</Title>
      <NavBar>
        <NavLinks>
          <a href="#" onClick={() => navigate('/admin/dashboard')}>
            Dashboard
          </a>
          <a href="#" onClick={() => navigate('/admin/messages')}>
            Message
          </a>
        </NavLinks>
        <Filters>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="contacted">Contacted</option>
            <option value="closed">Closed</option>
          </Select>
          <DateRangeWrapper>
            <DateRangeButton onClick={() => setShowDatePicker(!showDatePicker)}>
              {dateRange[0].startDate && dateRange[0].endDate
                ? `${dateRange[0].startDate.toLocaleDateString()} - ${dateRange[0].endDate.toLocaleDateString()}`
                : 'Select Date Range'}
            </DateRangeButton>
            {showDatePicker && (
              <DateRange
                editableDateInputs={true}
                onChange={(item) => {
                  setDateRange([item.selection]);
                  setShowDatePicker(false);
                }}
                moveRangeOnFirstSelection={false}
                ranges={dateRange}
                className="rdrDateRangePickerWrapper"
              />
            )}
          </DateRangeWrapper>
        </Filters>
      </NavBar>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {filteredMessages.length === 0 && !error ? (
        <p>No messages available.</p>
      ) : (
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <Th>ID</Th>
                <Th>Name</Th>
                <Th>Phone</Th>
                <Th>Message</Th>
                <Th>Status</Th>
                <Th>Follow-up Date</Th>
                <Th>Submitted At</Th>
                <Th>Action</Th>
              </tr>
            </thead>
            <tbody>
              {filteredMessages.map((message) => (
                <tr key={message.id}>
                  <Td>{message.id}</Td>
                  <Td>{message.name}</Td>
                  <Td>{message.phone}</Td>
                  <Td>{message.message || 'N/A'}</Td>
                  <Td>{message.status}</Td>
                  <Td>{message.followupdate || 'No follow-up'}</Td>
                  <Td>{new Date(message.created_at).toLocaleString()}</Td>
                  <Td>
                    <ActionButton onClick={() => handleView(message)} title="View">
                      <FaEye />
                    </ActionButton>
                    <ActionButton onClick={() => handleEdit(message.id)} title="Edit">
                      <FaEdit />
                    </ActionButton>
                    <ActionButton onClick={() => handleDelete(message.id)} title="Delete">
                      <FaTrash />
                    </ActionButton>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      )}

      {viewModal && (
        <Modal>
          <ModalContent>
            <ModalHeader>Message Details</ModalHeader>
            <ModalBody>
              <p><strong>ID:</strong> {viewModal.id}</p>
              <p><strong>Name:</strong> {viewModal.name}</p>
              <p><strong>Phone:</strong> {viewModal.phone}</p>
              <p><strong>Message:</strong> {viewModal.message || 'N/A'}</p>
              <p><strong>Status:</strong> {viewModal.status}</p>
              <p><strong>Follow-up Date:</strong> {viewModal.followupdate || 'No follow-up'}</p>
              <p><strong>Submitted At:</strong> {new Date(viewModal.created_at).toLocaleString()}</p>
            </ModalBody>
            <ModalFooter>
              <CloseButton onClick={() => setViewModal(null)}>Close</CloseButton>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      {editModal && (
        <Modal>
          <ModalContent>
            <ModalHeader>Edit Message</ModalHeader>
            <ModalBody>
              <Label>
                Name
                <Input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  required
                />
              </Label>
              <Label>
                Phone
                <Input
                  type="tel"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  required
                />
              </Label>
              <Label>
                Message
                <TextArea
                  rows="4"
                  value={editForm.message}
                  onChange={(e) => setEditForm({ ...editForm, message: e.target.value })}
                />
              </Label>
              <Label>
                Status
                <Select
                  value={editForm.status}
                  onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                >
                  <option value="pending">Pending</option>
                  <option value="contacted">Contacted</option>
                  <option value="closed">Closed</option>
                </Select>
              </Label>
              {['pending', 'contacted'].includes(editForm.status) && (
                <Label>
                  Follow-up Date
                  <Input
                    type="date"
                    value={editForm.followupdate}
                    onChange={(e) => setEditForm({ ...editForm, followupdate: e.target.value })}
                  />
                </Label>
              )}
            </ModalBody>
            <ModalFooter>
              <CloseButton onClick={() => setEditModal(null)}>Cancel</CloseButton>
              <UpdateButton onClick={handleUpdate}>Update</UpdateButton>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default AdminMessages;