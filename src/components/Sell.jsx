
import React, { useState } from 'react';
import styled from 'styled-components';
import { FaHome, FaWarehouse, FaStore, FaTree } from 'react-icons/fa';

// Category config
const categories = [
  { label: 'Flat', icon: <FaHome />, value: 'flat' },
  { label: 'Plot', icon: <FaWarehouse />, value: 'plot' },
  { label: 'Shop', icon: <FaStore />, value: 'shop' },
  { label: 'Land', icon: <FaTree />, value: 'land' },
];

// Styled Components
const Container = styled.div`
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const Banner = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  h1 { font-size: 2.5rem; color: #003e73; }
  p { font-size: 1.2rem; color: #555; }
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const CategoryCard = styled.div`
  background: #f4f4f4;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.3s ease;

  &:hover { border-color: #003e73; background: #e6f0fa; }
  svg { font-size: 2rem; margin-bottom: 0.5rem; color: #003e73; }
  &.active { border-color: #003e73; background: #d6eaff; }
`;

const FormWrapper = styled.form`
  background: #f9f9f9;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);

  label { display: block; margin-top: 1rem; font-weight: 600; }
  input, select {
    width: 100%;
    padding: 0.7rem;
    margin-top: 0.3rem;
    border-radius: 8px;
    border: 1px solid #ccc;
  }

  button {
    margin-top: 1.5rem;
    padding: 0.8rem 2rem;
    background: #003e73;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    &:hover { background: #005ca8; }
  }

  span { color: red; font-size: 0.9rem; }
  .flex { display: flex; gap: 1rem; }
`;

const Sell = () => {
  const [selectedCategory, setSelectedCategory] = useState('flat');
  const [formData, setFormData] = useState({ propertyType: 'Flat' });
  const [errors, setErrors] = useState({});
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [hasPaid, setHasPaid] = useState(false);
  const [paymentInitiated, setPaymentInitiated] = useState(false);


  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Required';
    if (!formData.phone) newErrors.phone = 'Required';
    if (!formData.location) newErrors.location = 'Required';
    if (!formData.pricePerSqft) newErrors.pricePerSqft = 'Required';
    if (!formData.papers) newErrors.papers = 'Required';
    if (!formData.ownerType) newErrors.ownerType = 'Required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length === 0) {
      const totalSqft = formData.width * formData.length;
      const totalPrice = totalSqft * formData.pricePerSqft;

      console.log({
        ...formData,
        sqft: totalSqft,
        totalPrice,
      });

      console.log('Uploaded Images:', images);
      alert('Your property has been listed successfully!');
      setFormData({ propertyType: selectedCategory });
      setImages([]);
    }
  };

  const handleMediaUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };


  return (
    <Container>
      
      <Banner>
        {/* 2-Box Styling for Heading */}
  <style>
    {`
      @media (max-width: 768px) {
        .builder-wrapper {
          font-size: 2rem !important;
        }
        .big-box {
          width: 50px !important;
          height: 50px !important;
          top: -12px !important;
          left: -12px !important;
        }
        .small-box {
          width: 25px !important;
          height: 25px !important;
          top: -28px !important;
          left: 24px !important;
        }
        .underline-bar {
          margin-top: 0.8rem !important;
        }
      }
    `}
  </style>

  <div style={{ textAlign: "center", marginTop: "60px", marginBottom: "20px" }}>
    <h2
      className="builder-wrapper"
      style={{
        fontSize: "2.5rem",
        fontWeight: "800",
        color: "#1f2937",
        position: "relative",
        display: "inline-block",
        lineHeight: "1.2",
      }}
    >
      <span
        style={{
          position: "relative",
          display: "inline-block",
          marginRight: "8px",
        }}
      >
        <span
          className="big-box"
          style={{
            position: "absolute",
            top: "-15px",
            left: "-20px",
            width: "60px",
            height: "60px",
            backgroundColor: "#005ca8",
            borderRadius: "6px",
            zIndex: -2,
          }}
        ></span>
        <span
          className="small-box"
          style={{
            position: "absolute",
            top: "-32px",
            left: "20px",
            width: "30px",
            height: "30px",
            backgroundColor: "#005ca8",
            border: "2px solid white",
            borderRadius: "6px",
            zIndex: -1,
          }}
        ></span>
        Sell 
      </span>
      Your Property
    </h2>
  </div>

        <h1></h1>
        <p>Select the property type and fill in the details below</p>
      </Banner>

      <CategoryGrid>
        {categories.map((cat) => (
          <CategoryCard
            key={cat.value}
            className={selectedCategory === cat.value ? 'active' : ''}
            onClick={() => {
              setSelectedCategory(cat.value);
              setFormData({ ...formData, propertyType: cat.label });
              setErrors({});
            }}
          >
            {cat.icon}
            <div>{cat.label}</div>
          </CategoryCard>
        ))}
      </CategoryGrid>

      <h2 style={{ marginBottom: '1rem' }}>
        Property Details – {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
      </h2>

      <FormWrapper onSubmit={handleSubmit}>
        <label>Your Name*</label>
        <input type="text" name="name" value={formData.name || ''} onChange={handleChange} />
        {errors.name && <span>{errors.name}</span>}

        <label>Phone Number*</label>
        <input type="text" name="phone" value={formData.phone || ''} onChange={handleChange} />
        {errors.phone && <span>{errors.phone}</span>}

        <label>Location*</label>
        <input type="text" name="location" value={formData.location || ''} onChange={handleChange} />
        {errors.location && <span>{errors.location}</span>}

        {/* Category Specific Fields */}
        {selectedCategory === 'flat' && (
          <>
            <label>Size (Width x Length in feet)</label>
            <div className="flex">
              <input type="number" name="width" placeholder="Width" value={formData.width || ''} onChange={handleChange} />
              <input type="number" name="length" placeholder="Length" value={formData.length || ''} onChange={handleChange} />
            </div>

            <label>Area (Sqft)</label>
            <input
              type="number"
              readOnly
              value={formData.width && formData.length ? formData.width * formData.length : ''}
            />

            <label>BHK</label>
            <select name="bhk" value={formData.bhk || ''} onChange={handleChange}>
              <option value="">Select</option>
              <option value="1 BHK">1 BHK</option>
              <option value="2 BHK">2 BHK</option>
              <option value="3 BHK">3 BHK</option>
              <option value="4+ BHK">4+ BHK</option>
            </select>
          </>
        )}

        {selectedCategory === 'plot' && (
          <>
            <label>Plot Area (in Sqft)</label>
            <input type="number" name="plotArea" value={formData.plotArea || ''} onChange={handleChange} />

            <label>Facing</label>
            <select name="facing" value={formData.facing || ''} onChange={handleChange}>
              <option value="">Select</option>
              <option value="East">East</option>
              <option value="West">West</option>
              <option value="North">North</option>
              <option value="South">South</option>
            </select>
          </>
        )}

        {selectedCategory === 'shop' && (
          <>
            <label>Shop Size (Sqft)</label>
            <input type="number" name="shopSize" value={formData.shopSize || ''} onChange={handleChange} />

            <label>Floor</label>
            <input type="text" name="floor" placeholder="Ground / 1st / 2nd..." value={formData.floor || ''} onChange={handleChange} />
          </>
        )}

        {selectedCategory === 'land' && (
          <>
            <label>Total Area (Acres)</label>
            <input type="number" name="landArea" value={formData.landArea || ''} onChange={handleChange} />

            <label>Zoning</label>
            <select name="zoning" value={formData.zoning || ''} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Agricultural">Agricultural</option>
              <option value="Commercial">Commercial</option>
              <option value="Industrial">Industrial</option>
            </select>
          </>
        )}

        {/* Common Fields */}
        <label>Price per Sqft*</label>
        <input type="number" name="pricePerSqft" value={formData.pricePerSqft || ''} onChange={handleChange} />
        {errors.pricePerSqft && <span>{errors.pricePerSqft}</span>}

        <label>Property Papers*</label>
        <select name="papers" value={formData.papers || ''} onChange={handleChange}>
          <option value="">Select</option>
          <option value="RL">RL</option>
          <option value="NA">NA</option>
          <option value="TP">TP</option>
        </select>
        {errors.papers && <span>{errors.papers}</span>}

        <label>Seller Type*</label>
        <select name="ownerType" value={formData.ownerType || ''} onChange={handleChange}>
          <option value="">Select</option>
          <option value="Owner">Owner</option>
          <option value="Dealer">Dealer</option>
        </select>
        {errors.ownerType && <span>{errors.ownerType}</span>}

        <label>Property Type</label>
        <input type="text" name="propertyType" readOnly value={formData.propertyType || ''} />

        <label>Upload Images*</label>
        <input
          type="file"
          name="media"
          multiple
          accept="image/*,video/*"
          onChange={handleMediaUpload}
        />


        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
          {images.length > 0 &&
            images.map((file, i) => {
              const url = URL.createObjectURL(file);
              const isVideo = file.type.startsWith('video/');
              return isVideo ? (
                <video
                  key={i}
                  src={url}
                  width="100"
                  height="80"
                  style={{ borderRadius: '8px' }}
                  controls
                />
              ) : (
                <img
                  key={i}
                  src={url}
                  alt={`preview-${i}`}
                  style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
                />
              );
            })}
        </div>

        {!hasPaid && (
          <div style={{ marginTop: '2rem', background: '#fffbe6', border: '1px solid #facc15', padding: '1rem', borderRadius: '8px' }}>
<p style={{ color: '#92400e', fontWeight: '500' }}>
  Kindly note: A listing fee of ₹100 is applicable to post your property.
</p>


            <button
              type="button"
              onClick={() => {
                setPaymentInitiated(true);
                setTimeout(() => {
                  setHasPaid(true);
                  setPaymentInitiated(false);
                  alert('₹100 payment successful!');
                }, 2000);
              }}
              style={{
                marginTop: '10px',
                padding: '0.6rem 1.5rem',
                background: '#22c55e',
                color: 'white',
                fontWeight: 'bold',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
              disabled={paymentInitiated}
            >
              {paymentInitiated ? 'Processing...' : 'Pay ₹100 & Continue'}
            </button>
          </div>
        )}

        <button type="submit" disabled={!hasPaid}>
  {hasPaid ? 'Submit Property' : 'Please Pay ₹100 First'}
</button>

      </FormWrapper>
    </Container>
  );
};

export default Sell;

