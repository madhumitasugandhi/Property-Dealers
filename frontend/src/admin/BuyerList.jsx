import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  margin-top: 20px;
  overflow-x: auto;
  padding-bottom: 10px;
  -webkit-overflow-scrolling: touch;
  position: relative;
`;

const NavBar = styled.div`
  display: flex;
  justify-content: flex-end; /* Align filters to the right */
  align-items: center;
  margin-bottom: 20px;
  font-size: 1rem;
  color: #333;
  position: relative; /* For absolute positioning of NavLinks if needed */
`;

const NavLinks = styled.div`
  position: absolute;
  left: 0;
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

const FilterBar = styled.div`
  display: flex;
  gap: 20px; /* Increased gap for better spacing */
  align-items: center;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const FilterLabel = styled.label`
  font-weight: 600;
  color: #333;
  font-size: 0.9rem;
`;

const FilterSelect = styled.select`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  font-size: 0.9rem;
  color: #333;
  cursor: pointer;
  width: 150px;

  &:focus {
    outline: none;
    border-color: #005ca8;
  }
`;

const FilterInputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const FilterInput = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  font-size: 0.9rem;
  color: #333;
  width: 140px;

  &:focus {
    outline: none;
    border-color: #005ca8;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`;

const TableHeader = styled.th`
  padding: 10px;
  text-align: left;
  background-color: #005ca8;
  color: white;
  border-bottom: 2px solid #ddd;

  @media (max-width: 480px) {
    padding: 6px;
  }
`;

const TableRow = styled.tr`
  &:hover {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  text-align: left;

  @media (max-width: 768px) {
    padding: 8px;
  }

  @media (max-width: 480px) {
    padding: 6px;
    word-wrap: break-word;
  }
`;

const ActionCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  text-align: center;

  @media (max-width: 768px) {
    padding: 8px;
  }

  @media (max-width: 480px) {
    padding: 6px;
  }
`;

const IconButton = styled.div`
  font-size: 1rem;
  cursor: pointer;
  display: inline-block;
  margin: 0 5px;
  padding: 5px 8px;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  &.view {
    background-color: #4caf50;
    color: white;
    &:hover {
      background-color: #45a049;
    }
  }

  &.edit {
    background-color: #2196f3;
    color: white;
    &:hover {
      background-color: #1976d2;
    }
  }

  &.delete {
    background-color: #f44336;
    color: white;
    &:hover {
      background-color: #d32f2f;
    }
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin: 0 3px;
    padding: 4px 6px;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
`;

const LoadingMessage = styled.p`
  color: #005ca8;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: ${props => (props.show ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  max-height: 80vh;
  overflow-y: auto;

  @media (max-width: 480px) {
    width: 90%;
    padding: 15px;
  }
`;

const CloseButton = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 1.5rem;
  color: #555;

  &:hover {
    color: #005ca8;
  }
`;

const CardItem = styled.div`
  margin-bottom: 15px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardLabel = styled.div`
  font-weight: 600;
  color: #333;
  margin-right: 10px;
  min-width: 120px;
`;

const CardValue = styled.div`
  flex: 1;
  color: #333;
  word-wrap: break-word;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: ${props => (props.readOnly ? '#f0f0f0' : 'white')};
  color: ${props => (props.readOnly ? '#666' : '#333')};

  &:focus {
    outline: none;
    border-color: #005ca8;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;

  &:focus {
    outline: none;
    border-color: #005ca8;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
  min-height: 80px;

  &:focus {
    outline: none;
    border-color: #005ca8;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 8px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }

  ${props =>
    props.primary
      ? `
        background: #005ca8;
        color: white;
        &:hover:not(:disabled) {
          background: #004d8d;
        }
      `
      : `
        background: #fff;
        color: #005ca8;
        border: 1px solid #005ca8;
        &:hover:not(:disabled) {
          background: #f0f0f0;
        }
      `}
`;

const BuyerList = () => {
  const [buyers, setBuyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [selectedBuyerForView, setSelectedBuyerForView] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    property_type: '',
    title: '',
    status: '',
    remarks: '',
    followUpDate: '',
    visitDate: '',
  });
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    status: '',
    followUpStart: '',
    followUpEnd: '',
    visitStart: '',
    visitEnd: '',
  });

  useEffect(() => {
    fetchBuyers();
  }, []);

  const fetchBuyers = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/buyer');
      const data = res.data;

      console.log('Fetched buyers:', data);

      if (Array.isArray(data)) {
        setBuyers(data);
      } else {
        throw new Error('API did not return an array');
      }
    } catch (err) {
      console.error('Failed to fetch buyers:', err);
      setError('Failed to fetch buyer data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const applyFilters = (buyers) => {
    return buyers.filter((buyer) => {
      const statusMatch = !filters.status || buyer.status === filters.status;
      const followUpMatch =
        !filters.followUpStart || !filters.followUpEnd
          ? true
          : buyer.follow_up_date &&
            new Date(buyer.follow_up_date) >= new Date(filters.followUpStart) &&
            new Date(buyer.follow_up_date) <= new Date(filters.followUpEnd);
      const visitMatch =
        !filters.visitStart || !filters.visitEnd
          ? true
          : buyer.visit_date &&
            new Date(buyer.visit_date) >= new Date(filters.visitStart) &&
            new Date(buyer.visit_date) <= new Date(filters.visitEnd);

      return statusMatch && followUpMatch && visitMatch;
    });
  };

  const handleEditClick = (buyerId) => {
    const buyer = buyers.find((b) => b.id === buyerId);
    if (buyer) {
      setSelectedBuyer(buyer);
      setFormData({
        name: buyer.name,
        phone: buyer.phone,
        property_type: buyer.property_type,
        title: buyer.title,
        status: buyer.status,
        remarks: buyer.remarks || '',
        followUpDate: buyer.follow_up_date || '',
        visitDate: buyer.visit_date || '',
      });
      setShowEditModal(true);
    }
  };

  const handleViewClick = (buyerId) => {
    const buyer = buyers.find((b) => b.id === buyerId);
    if (buyer) {
      setSelectedBuyerForView(buyer);
      setShowViewModal(true);
    }
  };

  const handleDeleteClick = async (buyerId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/buyer/${buyerId}`);
      console.log('Delete response:', response.data);
      toast.success('Buyer deleted successfully!');
      await fetchBuyers();
    } catch (err) {
      console.error('Failed to delete buyer:', err.response ? err.response.data : err.message);
      toast.error('Failed to delete buyer!');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updateData = {
        name: formData.name,
        phone: formData.phone,
        property_type: formData.property_type,
        title: formData.title,
        status: formData.status,
        remarks: formData.remarks,
        ...(formData.status === 'interested' || formData.status === 'not interested' || formData.status === 'follow up'
          ? { follow_up_date: formData.followUpDate || null, visit_date: formData.visitDate || null }
          : {}),
      };
      console.log('Update data being sent:', updateData);
      const response = await axios.patch(`http://localhost:5000/api/buyer/${selectedBuyer.id}`, updateData);
      console.log('Update response:', response.data);
      setShowEditModal(false);
      await fetchBuyers();
    } catch (err) {
      console.error('Failed to update buyer:', err.response ? err.response.data : err.message);
      toast.error(`Failed to update buyer: ${err.response ? err.response.data.message : err.message}`);
      setError(`Failed to update buyer: ${err.response ? err.response.data.message : err.message}. Check server logs.`);
    }
  };

  const handleCancel = () => {
    setShowEditModal(false);
    setFormData({
      name: '',
      phone: '',
      property_type: '',
      title: '',
      status: '',
      remarks: '',
      followUpDate: '',
      visitDate: '',
    });
    setSelectedBuyer(null);
  };

  const handleCloseView = () => {
    setShowViewModal(false);
    setSelectedBuyerForView(null);
  };

  if (loading) {
    return <LoadingMessage>Loading buyer data...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  const filteredBuyers = applyFilters(buyers);

  return (
    <div>
      <h2>All Buyer Requests</h2>
      <NavBar>
        <NavLinks>
          <a href="#" onClick={() => navigate('/admin/dashboard')}>Dashboard</a>
          <a href="#" onClick={() => navigate('/admin/buyer')}>Buyer</a>
        </NavLinks>
        <FilterBar>
          <FilterGroup>
            <FilterLabel>Lead Status</FilterLabel>
            <FilterSelect name="status" value={filters.status} onChange={handleFilterChange}>
              <option value="">All</option>
              <option value="interested">Interested</option>
              <option value="not interested">Not Interested</option>
              <option value="not contacted">Not Contacted</option>
              <option value="unreachable">Unreachable</option>
              <option value="follow up">Follow Up</option>
            </FilterSelect>
          </FilterGroup>
          <FilterGroup>
            <FilterLabel>Follow-up Date</FilterLabel>
            <FilterInputGroup>
              <FilterInput
                type="date"
                name="followUpStart"
                value={filters.followUpStart}
                onChange={handleFilterChange}
              />
              <span style={{ margin: '0 5px', color: '#666' }}>to</span>
              <FilterInput
                type="date"
                name="followUpEnd"
                value={filters.followUpEnd}
                onChange={handleFilterChange}
              />
            </FilterInputGroup>
          </FilterGroup>
          <FilterGroup>
            <FilterLabel>Visit Date</FilterLabel>
            <FilterInputGroup>
              <FilterInput
                type="date"
                name="visitStart"
                value={filters.visitStart}
                onChange={handleFilterChange}
              />
              <span style={{ margin: '0 5px', color: '#666' }}>to</span>
              <FilterInput
                type="date"
                name="visitEnd"
                value={filters.visitEnd}
                onChange={handleFilterChange}
              />
            </FilterInputGroup>
          </FilterGroup>
        </FilterBar>
      </NavBar>
      {filteredBuyers.length === 0 ? (
        <p>No buyer data available with current filters.</p>
      ) : (
        <Container>
          <Table>
            <thead>
              <tr>
                <TableHeader>SRNo</TableHeader>
                <TableHeader>Name</TableHeader>
                <TableHeader>Phone</TableHeader>
                <TableHeader>Property Type</TableHeader>
                <TableHeader>Interested Property</TableHeader>
                <TableHeader>Lead Status</TableHeader>
                <TableHeader>Follow Up Date</TableHeader>
                <TableHeader>Visit Date</TableHeader>
                <TableHeader>Created At</TableHeader>
                <TableHeader>Action</TableHeader>
              </tr>
            </thead>
            <tbody>
              {filteredBuyers.map((buyer, index) => (
                <TableRow key={buyer.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{buyer.name}</TableCell>
                  <TableCell>{buyer.phone}</TableCell>
                  <TableCell>{buyer.property_type}</TableCell>
                  <TableCell>{buyer.title}</TableCell>
                  <TableCell>{buyer.status}</TableCell>
                  <TableCell>
                    {buyer.follow_up_date
                      ? new Date(buyer.follow_up_date).toLocaleDateString()
                      : (buyer.status === 'unreachable' || buyer.status === 'not contacted') ? 'No Follow Up' : ''}
                  </TableCell>
                  <TableCell>
                    {buyer.visit_date
                      ? new Date(buyer.visit_date).toLocaleDateString()
                      : (buyer.status === 'unreachable' || buyer.status === 'not contacted') ? 'No Visit' : ''}
                  </TableCell>
                  <TableCell>{new Date(buyer.created_at).toLocaleDateString()}</TableCell>
                  <ActionCell>
                    <IconButton className="view" onClick={(e) => { e.stopPropagation(); handleViewClick(buyer.id); }}>👀 </IconButton>
                    <IconButton className="edit" onClick={(e) => { e.stopPropagation(); handleEditClick(buyer.id); }}>✏️ </IconButton>
                    <IconButton className="delete" onClick={(e) => { e.stopPropagation(); handleDeleteClick(buyer.id); }}>🗑️</IconButton>
                  </ActionCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </Container>
      )}

      {showEditModal && (
        <Modal show={showEditModal}>
          <ModalContent>
            <CloseButton onClick={handleCancel}>&times;</CloseButton>
            <h3>Edit Buyer Details</h3>
            <form onSubmit={handleUpdate}>
              <FormGroup>
                <Label>Name</Label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  readOnly
                />
              </FormGroup>
              <FormGroup>
                <Label>Phone</Label>
                <Input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  readOnly
                />
              </FormGroup>
              <FormGroup>
                <Label>Property Type</Label>
                <Input
                  type="text"
                  value={formData.property_type}
                  onChange={(e) => setFormData({ ...formData, property_type: e.target.value })}
                  readOnly
                />
              </FormGroup>
              <FormGroup>
                <Label>Interested Property</Label>
                <Input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  readOnly
                />
              </FormGroup>
              <FormGroup>
                <Label>Lead Status</Label>
                <Select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="" disabled>Select Status</option>
                  <option value="interested">Interested</option>
                  <option value="not interested">Not Interested</option>
                  <option value="not contacted">Not Contacted</option>
                  <option value="unreachable">Unreachable</option>
                  <option value="follow up">Follow Up</option>
                </Select>
              </FormGroup>
              {(formData.status === 'interested' || formData.status === 'not interested' || formData.status === 'follow up') && (
                <>
                  <FormGroup>
                    <Label>Follow Up Date</Label>
                    <Input
                      type="date"
                      value={formData.followUpDate}
                      onChange={(e) => setFormData({ ...formData, followUpDate: e.target.value })}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Visit Date</Label>
                    <Input
                      type="date"
                      value={formData.visitDate}
                      onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                    />
                  </FormGroup>
                </>
              )}
              <FormGroup>
                <Label>Remarks</Label>
                <TextArea
                  value={formData.remarks}
                  onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                  placeholder="Add remarks..."
                />
              </FormGroup>
              <ButtonGroup>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button type="submit" primary disabled={!formData.status}>Update</Button>
              </ButtonGroup>
            </form>
          </ModalContent>
        </Modal>
      )}

      {showViewModal && selectedBuyerForView && (
        <Modal show={showViewModal}>
          <ModalContent>
            <CloseButton onClick={handleCloseView}>&times;</CloseButton>
            <h3>View Buyer Details</h3>
            <div>
              <CardItem>
                <CardLabel>Name:</CardLabel>
                <CardValue>{selectedBuyerForView.name}</CardValue>
              </CardItem>
              <CardItem>
                <CardLabel>Phone:</CardLabel>
                <CardValue>{selectedBuyerForView.phone}</CardValue>
              </CardItem>
              <CardItem>
                <CardLabel>Property Type:</CardLabel>
                <CardValue>{selectedBuyerForView.property_type}</CardValue>
              </CardItem>
              <CardItem>
                <CardLabel>Interested Property:</CardLabel>
                <CardValue>{selectedBuyerForView.title}</CardValue>
              </CardItem>
              <CardItem>
                <CardLabel>Lead Status:</CardLabel>
                <CardValue>{selectedBuyerForView.status}</CardValue>
              </CardItem>
              <CardItem>
                <CardLabel>Follow Up Date:</CardLabel>
                <CardValue>
                  {selectedBuyerForView.follow_up_date
                    ? new Date(selectedBuyerForView.follow_up_date).toLocaleDateString()
                    : (selectedBuyerForView.status === 'unreachable' || selectedBuyerForView.status === 'not contacted')
                      ? 'No Follow Up'
                      : ''}
                </CardValue>
              </CardItem>
              <CardItem>
                <CardLabel>Visit Date:</CardLabel>
                <CardValue>
                  {selectedBuyerForView.visit_date
                    ? new Date(selectedBuyerForView.visit_date).toLocaleDateString()
                    : (selectedBuyerForView.status === 'unreachable' || selectedBuyerForView.status === 'not contacted')
                      ? 'No Visit'
                      : ''}
                </CardValue>
              </CardItem>
              <CardItem>
                <CardLabel>Remarks:</CardLabel>
                <CardValue>{selectedBuyerForView.remarks || 'N/A'}</CardValue>
              </CardItem>
              <CardItem>
                <CardLabel>Created At:</CardLabel>
                <CardValue>{new Date(selectedBuyerForView.created_at).toLocaleDateString()}</CardValue>
              </CardItem>
            </div>
            <ButtonGroup>
              <Button onClick={handleCloseView}>Close</Button>
            </ButtonGroup>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default BuyerList;