import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// Styled Components (unchanged from provided)
const Container = styled.div`
  margin-top: 20px;
  overflow-x: auto;
  padding-bottom: 10px;
  -webkit-overflow-scrolling: touch;
  position: relative;
`;

const NavBar = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 20px;
  font-size: 1rem;
  color: #333;
  position: relative;
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
  gap: 20px;
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

const ImageGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const Image = styled.img`
  width: 80px;
  height: 60px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
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

const SellerList = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [selectedSellerForView, setSelectedSellerForView] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    title: '',
    location: '',
    taluka: '',
    width: '',
    length: '',
    area: '',
    bhk: '',
    floor: '',
    totalPrice: '',
    description: '',
    status: '',
    remarks: '',
    followUpDate: '',
    visitDate: '',
    propertyType: '',
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
    fetchSellers();
  }, []);

  const fetchSellers = async () => {
    try {
      setLoading(true);
      console.log("Fetching sellers from http://localhost:5000/api/seller");
      const res = await axios.get('http://localhost:5000/api/seller');
      console.log("Fetched sellers:", res.data);
      const data = res.data;
      if (Array.isArray(data)) {
        setSellers(data);
      } else {
        throw new Error('API did not return an array');
      }
    } catch (err) {
      console.error('Failed to fetch sellers:', err.response?.data || err.message);
      setError(`Failed to fetch seller data: ${err.response?.data?.message || err.message}. Check server logs.`);
      toast.error("Failed to fetch sellers. Please try again.");
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

  const applyFilters = (sellers) => {
    return sellers.filter((seller) => {
      const statusMatch = !filters.status || seller.status === filters.status;
      const followUpMatch =
        !filters.followUpStart || !filters.followUpEnd
          ? true
          : seller.follow_up_date &&
            new Date(seller.follow_up_date) >= new Date(filters.followUpStart) &&
            new Date(seller.follow_up_date) <= new Date(filters.followUpEnd);
      const visitMatch =
        !filters.visitStart || !filters.visitEnd
          ? true
          : seller.visit_date &&
            new Date(seller.visit_date) >= new Date(filters.visitStart) &&
            new Date(seller.visit_date) <= new Date(filters.visitEnd);

      return statusMatch && followUpMatch && visitMatch;
    });
  };

  const handleEditClick = (sellerId) => {
    const seller = sellers.find((s) => s.id === sellerId);
    if (seller) {
      setSelectedSeller(seller);
      setFormData({
        name: seller.name,
        phone: seller.phone.toString(),
        title: seller.title || '',
        location: seller.location,
        taluka: seller.taluka || '',
        width: seller.width || '',
        length: seller.length || '',
        area: seller.area || '',
        bhk: seller.bhk || '',
        floor: seller.floor || '',
        totalPrice: seller.totalPrice || '',
        description: seller.description || '',
        status: seller.status,
        remarks: seller.remarks || '',
        followUpDate: seller.follow_up_date || '',
        visitDate: seller.visit_date || '',
        propertyType: seller.propertyType,
      });
      setShowEditModal(true);
    }
  };

  const handleViewClick = (sellerId) => {
    const seller = sellers.find((s) => s.id === sellerId);
    if (seller) {
      setSelectedSellerForView(seller);
      setShowViewModal(true);
    }
  };

  const handleDeleteClick = async (sellerId) => {
    try {
      console.log(`Deleting seller with ID: ${sellerId}`);
      const response = await axios.delete(`http://localhost:5000/api/seller/${sellerId}`);
      console.log("Delete response:", response.data);
      toast.success('Seller deleted successfully!');
      await fetchSellers();
    } catch (err) {
      console.error('Failed to delete seller:', err.response?.data || err.message);
      toast.error(`Failed to delete seller: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      if (isNaN(formData.phone) || formData.phone < 0) {
        toast.error("Phone number must be a positive integer");
        return;
      }
      if (formData.totalPrice && (isNaN(formData.totalPrice) || formData.totalPrice < 0)) {
        toast.error("Total price must be a positive number");
        return;
      }
      const updateData = {
        name: formData.name,
        phone: parseInt(formData.phone),
        title: formData.title,
        location: formData.location,
        taluka: formData.taluka,
        width: formData.width ? parseFloat(formData.width) : null,
        length: formData.length ? parseFloat(formData.length) : null,
        area: formData.area ? parseFloat(formData.area) : null,
        bhk: formData.bhk,
        floor: formData.floor,
        totalPrice: formData.totalPrice ? parseFloat(formData.totalPrice) : null,
        description: formData.description,
        status: formData.status,
        remarks: formData.remarks,
        follow_up_date: formData.followUpDate || null,
        visit_date: formData.visitDate || null,
        propertyType: formData.propertyType,
      };
      console.log(`Updating seller with ID: ${selectedSeller.id}`, updateData);
      const response = await axios.patch(`http://localhost:5000/api/seller/${selectedSeller.id}`, updateData);
      console.log("Update response:", response.data);
      setShowEditModal(false);
      await fetchSellers();
      toast.success('Seller updated successfully!');
    } catch (err) {
      console.error('Failed to update seller:', err.response?.data || err.message);
      toast.error(`Failed to update seller: ${err.response?.data?.message || err.message}`);
      setError(`Failed to update seller: ${err.response?.data?.message || err.message}. Check server logs.`);
    }
  };

  const handleCancel = () => {
    setShowEditModal(false);
    setFormData({
      name: '',
      phone: '',
      title: '',
      location: '',
      taluka: '',
      width: '',
      length: '',
      area: '',
      bhk: '',
      floor: '',
      totalPrice: '',
      description: '',
      status: '',
      remarks: '',
      followUpDate: '',
      visitDate: '',
      propertyType: '',
    });
    setSelectedSeller(null);
  };

  const handleCloseView = () => {
    setShowViewModal(false);
    setSelectedSellerForView(null);
  };

  if (loading) {
    return <LoadingMessage>Loading seller data...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  const filteredSellers = applyFilters(sellers);

  return (
    <div>
      <h2>All Seller Listings</h2>
      <NavBar>
        <NavLinks>
          <a href="#" onClick={() => navigate('/admin/dashboard')}>Dashboard</a>
          <a href="#" onClick={() => navigate('/admin/seller')}>Seller</a>
        </NavLinks>
        <FilterBar>
          <FilterGroup>
            <FilterLabel>Status</FilterLabel>
            <FilterSelect name="status" value={filters.status} onChange={handleFilterChange}>
              <option value="">All</option>
              <option value="Accepted">Accepted</option>
              <option value="Not Contacted">Not Contacted</option>
              <option value="Unreachable">Unreachable</option>
              <option value="Follow Up">Follow Up</option>
              <option value="Rejected">Rejected</option>
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
      {filteredSellers.length === 0 ? (
        <p>No seller data available with current filters.</p>
      ) : (
        <Container>
          <Table>
            <thead>
              <tr>
                <TableHeader>SRNo</TableHeader>
                <TableHeader>Name</TableHeader>
                <TableHeader>Phone</TableHeader>
                <TableHeader>Title</TableHeader>
                <TableHeader>Location</TableHeader>
                <TableHeader>Taluka</TableHeader>
                <TableHeader>Property Type</TableHeader>
                <TableHeader>Area (sqft)</TableHeader>
                <TableHeader>Total Price</TableHeader>
                <TableHeader>BHK</TableHeader>
                <TableHeader>Floor</TableHeader>
                <TableHeader>Description</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader>Follow Up Date</TableHeader>
                <TableHeader>Visit Date</TableHeader>
                <TableHeader>Images</TableHeader>
                <TableHeader>Created At</TableHeader>
                <TableHeader>Action</TableHeader>
              </tr>
            </thead>
            <tbody>
              {filteredSellers.map((seller, index) => (
                <TableRow key={seller.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{seller.name}</TableCell>
                  <TableCell>{seller.phone}</TableCell>
                  <TableCell>{seller.title || 'N/A'}</TableCell>
                  <TableCell>{seller.location}</TableCell>
                  <TableCell>{seller.taluka || 'N/A'}</TableCell>
                  <TableCell>{seller.propertyType}</TableCell>
                  <TableCell>{seller.area || 'N/A'}</TableCell>
                  <TableCell>{seller.totalPrice ? `₹${seller.totalPrice}` : 'N/A'}</TableCell>
                  <TableCell>{seller.bhk || 'N/A'}</TableCell>
                  <TableCell>{seller.floor || 'N/A'}</TableCell>
                  <TableCell>{seller.description || 'N/A'}</TableCell>
                  <TableCell>{seller.status}</TableCell>
                  <TableCell>
                    {seller.follow_up_date
                      ? new Date(seller.follow_up_date).toLocaleDateString()
                      : (seller.status === 'Unreachable' || seller.status === 'Not Contacted') ? 'No Follow Up' : ''}
                  </TableCell>
                  <TableCell>
                    {seller.visit_date
                      ? new Date(seller.visit_date).toLocaleDateString()
                      : (seller.status === 'Unreachable' || seller.status === 'Not Contacted') ? 'No Visit' : ''}
                  </TableCell>
                  <TableCell>
                    {seller.images && seller.images.length > 0 ? (
                      <ImageGrid>
                        {seller.images.map((img, idx) => (
                          <Image
                            key={idx}
                            src={`http://localhost:5000${img}`}
                            alt={`Property ${seller.name}`}
                          />
                        ))}
                      </ImageGrid>
                    ) : (
                      'No Images'
                    )}
                  </TableCell>
                  <TableCell>{new Date(seller.created_at).toLocaleDateString()}</TableCell>
                  <ActionCell>
                    <IconButton className="view" onClick={(e) => { e.stopPropagation(); handleViewClick(seller.id); }}>👀</IconButton>
                    <IconButton className="edit" onClick={(e) => { e.stopPropagation(); handleEditClick(seller.id); }}>✏️</IconButton>
                    <IconButton className="delete" onClick={(e) => { e.stopPropagation(); handleDeleteClick(seller.id); }}>🗑️</IconButton>
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
            <h3>Edit Seller Details</h3>
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
                  type="number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  readOnly
                />
              </FormGroup>
              <FormGroup>
                <Label>Title</Label>
                <Input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <Label>Location</Label>
                <Input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  readOnly
                />
              </FormGroup>
              <FormGroup>
                <Label>Taluka</Label>
                <Input
                  type="text"
                  value={formData.taluka}
                  onChange={(e) => setFormData({ ...formData, taluka: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <Label>Property Type</Label>
                <Input
                  type="text"
                  value={formData.propertyType}
                  onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                  readOnly
                />
              </FormGroup>
              <FormGroup>
                <Label>Width (ft)</Label>
                <Input
                  type="number"
                  value={formData.width}
                  onChange={(e) => setFormData({ ...formData, width: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <Label>Length (ft)</Label>
                <Input
                  type="number"
                  value={formData.length}
                  onChange={(e) => setFormData({ ...formData, length: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <Label>Area (sqft)</Label>
                <Input
                  type="number"
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <Label>BHK</Label>
                <Input
                  type="text"
                  value={formData.bhk}
                  onChange={(e) => setFormData({ ...formData, bhk: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <Label>Floor</Label>
                <Input
                  type="text"
                  value={formData.floor}
                  onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <Label>Total Price (₹)</Label>
                <Input
                  type="number"
                  value={formData.totalPrice}
                  onChange={(e) => setFormData({ ...formData, totalPrice: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <Label>Description</Label>
                <TextArea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Add description..."
                />
              </FormGroup>
              <FormGroup>
                <Label>Status</Label>
                <Select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="" disabled>Select Status</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Not Contacted">Not Contacted</option>
                  <option value="Unreachable">Unreachable</option>
                  <option value="Follow Up">Follow Up</option>
                  <option value="Rejected">Rejected</option>
                </Select>
              </FormGroup>
              {(formData.status === 'Accepted' || formData.status === 'Follow Up') && (
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

      {showViewModal && selectedSellerForView && (
        <Modal show={showViewModal}>
          <ModalContent>
            <CloseButton onClick={handleCloseView}>&times;</CloseButton>
            <h3>View Seller Details</h3>
            <div>
              <CardItem>
                <CardLabel>Name:</CardLabel>
                <CardValue>{selectedSellerForView.name}</CardValue>
              </CardItem>
              <CardItem>
                <CardLabel>Phone:</CardLabel>
                <CardValue>{selectedSellerForView.phone}</CardValue>
              </CardItem>
              <CardItem>
                <CardLabel>Title:</CardLabel>
                <CardValue>{selectedSellerForView.title || 'N/A'}</CardValue>
              </CardItem>
              <CardItem>
                <CardLabel>Location:</CardLabel>
                <CardValue>{selectedSellerForView.location}</CardValue>
              </CardItem>
              <CardItem>
                <CardLabel>Taluka:</CardLabel>
                <CardValue>{selectedSellerForView.taluka || 'N/A'}</CardValue>
              </CardItem>
              <CardItem>
                <CardLabel>Property Type:</CardLabel>
                <CardValue>{selectedSellerForView.propertyType}</CardValue>
              </CardItem>
              <CardItem>
                <CardLabel>Width (ft):</CardLabel>
                <CardValue>{selectedSellerForView.width || 'N/A'}</CardValue>
              </CardItem>
              <CardItem>
                <CardLabel>Length (ft):</CardLabel>
                <CardValue>{selectedSellerForView.length || 'N/A'}</CardValue>
              </CardItem>
              <CardItem>
                <CardLabel>Area (sqft):</CardLabel>
                <CardValue>{selectedSellerForView.area || 'N/A'}</CardValue>
              </CardItem>
              <CardItem>
                <CardLabel>BHK:</CardLabel>
                <CardValue>{selectedSellerForView.bhk || 'N/A'}</CardValue>
              </CardItem>
              <CardItem>
                <CardLabel>Floor:</CardLabel>
                <CardValue>{selectedSellerForView.floor || 'N/A'}</CardValue>
              </CardItem>
              <CardItem>
                <CardLabel>Total Price:</CardLabel>
                <CardValue>{selectedSellerForView.totalPrice ? `₹${selectedSellerForView.totalPrice}` : 'N/A'}</CardValue>
              </CardItem>
              <CardItem>
                <CardLabel>Description:</CardLabel>
                <CardValue>{selectedSellerForView.description || 'N/A'}</CardValue>
              </CardItem>
              <CardItem>
                <CardLabel>Status:</CardLabel>
                <CardValue>{selectedSellerForView.status}</CardValue>
              </CardItem>
              <CardItem>
                <CardLabel>Follow Up Date:</CardLabel>
                <CardValue>
                  {selectedSellerForView.follow_up_date
                    ? new Date(selectedSellerForView.follow_up_date).toLocaleDateString()
                    : (selectedSellerForView.status === 'Unreachable' || selectedSellerForView.status === 'Not Contacted') ? 'No Follow Up' : 'N/A'}
                </CardValue>
              </CardItem>
              <CardItem>
                <CardLabel>Visit Date:</CardLabel>
                <CardValue>
                  {selectedSellerForView.visit_date
                    ? new Date(selectedSellerForView.visit_date).toLocaleDateString()
                    : (selectedSellerForView.status === 'Unreachable' || selectedSellerForView.status === 'Not Contacted') ? 'No Visit' : 'N/A'}
                </CardValue>
              </CardItem>
              <CardItem>
                <CardLabel>Images:</CardLabel>
                <CardValue>
                  {selectedSellerForView.images && selectedSellerForView.images.length > 0 ? (
                    <ImageGrid>
                      {selectedSellerForView.images.map((img, idx) => (
                        <Image
                          key={idx}
                          src={`http://localhost:5000${img}`}
                          alt={`Property ${selectedSellerForView.name}`}
                        />
                      ))}
                    </ImageGrid>
                  ) : (
                    'No Images'
                  )}
                </CardValue>
              </CardItem>
              <CardItem>
                <CardLabel>Created At:</CardLabel>
                <CardValue>{new Date(selectedSellerForView.created_at).toLocaleDateString()}</CardValue>
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

export default SellerList;