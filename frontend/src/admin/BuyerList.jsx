import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
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

const FilterSelect = styled.select`
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
  background-color: #f1f5f9;
  padding: 10px;
  border-radius: 8px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
`;

const TableHeader = styled.th`
  padding: 12px;
  background-color: #005ca8;
  color: white;
  text-align: left;
  font-weight: 600;
  font-size: 1rem;
  border-bottom: 2px solid #ddd;

  &:nth-child(1) { min-width: 60px; max-width: 60px; } /* SRNo */
  &:nth-child(2) { min-width: 120px; } /* Name */
  &:nth-child(3) { min-width: 120px; } /* Phone */
  &:nth-child(4) { min-width: 120px; } /* Property Type */
  &:nth-child(5) { min-width: 150px; } /* Interested Property */
  &:nth-child(6) { min-width: 120px; } /* Lead Status */
  &:nth-child(7) { min-width: 120px; } /* Follow Up Date */
  &:nth-child(8) { min-width: 120px; } /* Visit Date */
  &:nth-child(9) { min-width: 120px; } /* Created At */
  &:nth-child(10) { min-width: 120px; } /* Action */
`;

const TableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
  text-align: left;
  font-size: 0.9rem;
  white-space: normal;

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 0.85rem;
  }

  @media (max-width: 480px) {
    padding: 6px;
    font-size: 0.8rem;
  }
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin: 0 5px;
  color: #005ca8;
  font-size: 1rem;
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

const LoadingMessage = styled.p`
  color: #005ca8;
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

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
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
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  margin-top: 5px;

  &:focus {
    outline: none;
    border-color: #005ca8;
  }
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

const CardItem = styled.div`
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardLabel = styled.div`
  font-weight: 600;
  color: #333;
  min-width: 120px;
`;

const CardValue = styled.div`
  flex: 1;
  color: #333;
  white-space: normal;
  word-wrap: break-word;
`;

const BuyerList = () => {
  const [buyers, setBuyers] = useState([]);
  const [filteredBuyers, setFilteredBuyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [selectedBuyerForView, setSelectedBuyerForView] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    propertyType: '',
    title: '',
    status: '',
    remarks: '',
    followUpDate: '',
    visitDate: '',
  });
  const [statusFilter, setStatusFilter] = useState('All');
  const [followUpRange, setFollowUpRange] = useState([
    { startDate: null, endDate: null, key: 'selection' },
  ]);
  const [visitRange, setVisitRange] = useState([
    { startDate: null, endDate: null, key: 'selection' },
  ]);
  const [showFollowUpPicker, setShowFollowUpPicker] = useState(false);
  const [showVisitPicker, setShowVisitPicker] = useState(false);
  const navigate = useNavigate();

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
        setFilteredBuyers(data);
      } else {
        throw new Error('API did not return an array');
      }
    } catch (err) {
      console.error('Failed to fetch buyers:', err);
      setError('Failed to fetch buyer data. Please try again later.');
      toast.error('Failed to fetch buyer data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = buyers;

    if (statusFilter !== 'All') {
      filtered = filtered.filter((buyer) => buyer.status === statusFilter);
    }

    if (followUpRange[0].startDate && followUpRange[0].endDate) {
      const start = new Date(followUpRange[0].startDate);
      const end = new Date(followUpRange[0].endDate);
      filtered = filtered.filter((buyer) => {
        if (!buyer.follow_up_date) return false;
        const followDate = new Date(buyer.follow_up_date);
        return followDate >= start && followDate <= end;
      });
    }

    if (visitRange[0].startDate && visitRange[0].endDate) {
      const start = new Date(visitRange[0].startDate);
      const end = new Date(visitRange[0].endDate);
      filtered = filtered.filter((buyer) => {
        if (!buyer.visit_date) return false;
        const visitDate = new Date(buyer.visit_date);
        return visitDate >= start && visitDate <= end;
      });
    }

    setFilteredBuyers(filtered);
  }, [statusFilter, followUpRange, visitRange, buyers]);

  const handleEditClick = (buyerId) => {
    const buyer = buyers.find((b) => b.id === buyerId);
    if (buyer) {
      setSelectedBuyer(buyer);
      setFormData({
        name: buyer.name,
        phone: buyer.phone,
        propertyType: buyer.propertyType,
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
    if (window.confirm('Are you sure you want to delete this buyer?')) {
      try {
        await axios.delete(`http://localhost:5000/api/buyer/${buyerId}`);
        setBuyers(buyers.filter((b) => b.id !== buyerId));
        setFilteredBuyers(filteredBuyers.filter((b) => b.id !== buyerId));
        toast.success('Buyer deleted successfully!');
      } catch (err) {
        console.error('Failed to delete buyer:', err);
        toast.error('Failed to delete buyer!');
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      if (!formData.status) {
        toast.error('Lead status is required');
        return;
      }
      const updateData = {
        name: formData.name,
        phone: formData.phone,
        propertyType: formData.propertyType,
        title: formData.title,
        status: formData.status,
        remarks: formData.remarks,
        ...(formData.status === 'interested' || formData.status === 'not interested' || formData.status === 'follow up'
          ? { follow_up_date: formData.followUpDate || null, visit_date: formData.visitDate || null }
          : { follow_up_date: null, visit_date: null }),
      };
      await axios.patch(`http://localhost:5000/api/buyer/${selectedBuyer.id}`, updateData);
      setShowEditModal(false);
      await fetchBuyers();
      toast.success('Buyer updated successfully!');
    } catch (err) {
      console.error('Failed to update buyer:', err);
      toast.error(`Failed to update buyer: ${err.response ? err.response.data.message : err.message}`);
      setError(`Failed to update buyer. Check server logs.`);
    }
  };

  const handleCancel = () => {
    setShowEditModal(false);
    setFormData({
      name: '',
      phone: '',
      propertyType: '',
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

  return (
    <Container>
      <Title>All Buyer Requests</Title>
      <NavBar>
        <NavLinks>
          <a href="#" onClick={() => navigate('/admin/dashboard')}>
            Dashboard
          </a>
          <a href="#" onClick={() => navigate('/admin/buyer')}>
            Buyer
          </a>
        </NavLinks>
        <Filters>
          <FilterSelect
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="interested">Interested</option>
            <option value="not interested">Not Interested</option>
            <option value="not contacted">Not Contacted</option>
            <option value="unreachable">Unreachable</option>
            <option value="follow up">Follow Up</option>
          </FilterSelect>
          <DateRangeWrapper>
            <DateRangeButton onClick={() => setShowFollowUpPicker(!showFollowUpPicker)}>
              {followUpRange[0].startDate && followUpRange[0].endDate
                ? `${followUpRange[0].startDate.toLocaleDateString()} - ${followUpRange[0].endDate.toLocaleDateString()}`
                : 'Select Follow-up Range'}
            </DateRangeButton>
            {showFollowUpPicker && (
              <DateRange
                editableDateInputs={true}
                onChange={(item) => {
                  setFollowUpRange([item.selection]);
                  setShowFollowUpPicker(false);
                }}
                moveRangeOnFirstSelection={false}
                ranges={followUpRange}
                className="rdrDateRangePickerWrapper"
              />
            )}
          </DateRangeWrapper>
          <DateRangeWrapper>
            <DateRangeButton onClick={() => setShowVisitPicker(!showVisitPicker)}>
              {visitRange[0].startDate && visitRange[0].endDate
                ? `${visitRange[0].startDate.toLocaleDateString()} - ${visitRange[0].endDate.toLocaleDateString()}`
                : 'Select Visit Range'}
            </DateRangeButton>
            {showVisitPicker && (
              <DateRange
                editableDateInputs={true}
                onChange={(item) => {
                  setVisitRange([item.selection]);
                  setShowVisitPicker(false);
                }}
                moveRangeOnFirstSelection={false}
                ranges={visitRange}
                className="rdrDateRangePickerWrapper"
              />
            )}
          </DateRangeWrapper>
        </Filters>
      </NavBar>
      {filteredBuyers.length === 0 ? (
        <p>No buyer data available with current filters.</p>
      ) : (
        <TableContainer>
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
                <tr key={buyer.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{buyer.name}</TableCell>
                  <TableCell>{buyer.phone}</TableCell>
                  <TableCell>{buyer.propertyType}</TableCell>
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
                  <TableCell>
                    <ActionButton onClick={() => handleViewClick(buyer.id)} title="View">
                      <FaEye />
                    </ActionButton>
                    <ActionButton onClick={() => handleEditClick(buyer.id)} title="Edit">
                      <FaEdit />
                    </ActionButton>
                    <ActionButton onClick={() => handleDeleteClick(buyer.id)} title="Delete">
                      <FaTrash />
                    </ActionButton>
                  </TableCell>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      )}

      {showEditModal && (
        <Modal>
          <ModalContent>
            <ModalHeader>Edit Buyer Details</ModalHeader>
            <ModalBody>
              <form onSubmit={handleUpdate}>
                <Label>
                  Name
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    readOnly
                  />
                </Label>
                <Label>
                  Phone
                  <Input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    readOnly
                  />
                </Label>
                <Label>
                  Property Type
                  <Input
                    type="text"
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    readOnly
                  />
                </Label>
                <Label>
                  Interested Property
                  <Input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    readOnly
                  />
                </Label>
                <Label>
                  Lead Status
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
                </Label>
                {(formData.status === 'interested' || formData.status === 'not interested' || formData.status === 'follow up') && (
                  <>
                    <Label>
                      Follow Up Date
                      <Input
                        type="date"
                        value={formData.followUpDate}
                        onChange={(e) => setFormData({ ...formData, followUpDate: e.target.value })}
                      />
                    </Label>
                    <Label>
                      Visit Date
                      <Input
                        type="date"
                        value={formData.visitDate}
                        onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                      />
                    </Label>
                  </>
                )}
                <Label>
                  Remarks
                  <TextArea
                    value={formData.remarks}
                    onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                    placeholder="Add remarks..."
                  />
                </Label>
                <ModalFooter>
                  <CloseButton onClick={handleCancel}>Cancel</CloseButton>
                  <UpdateButton type="submit" disabled={!formData.status}>Update</UpdateButton>
                </ModalFooter>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}

      {showViewModal && selectedBuyerForView && (
        <Modal>
          <ModalContent>
            <ModalHeader>View Buyer Details</ModalHeader>
            <ModalBody>
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
                <CardValue>{selectedBuyerForView.propertyType}</CardValue>
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
            </ModalBody>
            <ModalFooter>
              <CloseButton onClick={handleCloseView}>Close</CloseButton>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default BuyerList;