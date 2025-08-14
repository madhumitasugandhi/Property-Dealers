import React, { useState } from "react";
import styled from "styled-components";
import { FaHome, FaLandmark, FaStore, FaTree } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

// Category config
const categories = [
  { label: "Flat", icon: <FaHome />, value: "flat" },
  { label: "Farm", icon: <FaLandmark />, value: "farm" },
  { label: "Shop", icon: <FaStore />, value: "shop" },
  { label: "Land", icon: <FaTree />, value: "land" },
];

// Styled Components (unchanged)
const Container = styled.div`
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const Banner = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  h1 {
    font-size: 2.5rem;
    color: #003e73;
  }
  p {
    font-size: 1.2rem;
    color: #555;
  }
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

  &:hover {
    border-color: #003e73;
    background: #e6f0fa;
  }
  svg {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    color: #003e73;
  }
  &.active {
    border-color: #003e73;
    background: #d6eaff;
  }
`;

const FormWrapper = styled.form`
  background: #f9f9f9;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  label {
    display: block;
    margin-top: 1rem;
    font-weight: 600;
  }
  input,
  select,
  textarea {
    width: 100%;
    padding: 0.7rem;
    margin-top: 0.3rem;
    border-radius: 8px;
    border: 1px solid #ccc;
  }
  textarea {
    min-height: 100px;
    resize: vertical;
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
    &:hover {
      background: #005ca8;
    }
  }
  span {
    color: red;
    font-size: 0.9rem;
  }
  .flex {
    display: flex;
    gap: 1rem;
  }
`;

const Sell = () => {
  const [selectedCategory, setSelectedCategory] = useState("flat");
  const [formData, setFormData] = useState({ propertyType: "Flat" });
  const [errors, setErrors] = useState({});
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    else if (isNaN(formData.phone) || parseInt(formData.phone, 10) < 0) newErrors.phone = "Phone number must be a positive integer";
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.taluka) newErrors.taluka = "Taluka is required";
    if (!formData.description) newErrors.description = "Description is required";
    if (!formData.totalPrice || isNaN(formData.totalPrice) || parseFloat(formData.totalPrice) <= 0) newErrors.totalPrice = "Valid total price is required (greater than 0)";
    if (!formData.width || isNaN(formData.width) || parseFloat(formData.width) <= 0) newErrors.width = "Valid width required (greater than 0)";
    if (!formData.length || isNaN(formData.length) || parseFloat(formData.length) <= 0) newErrors.length = "Valid length required (greater than 0)";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);

    if (Object.keys(err).length === 0) {
      const totalSqft = parseFloat(formData.width) * parseFloat(formData.length);
      const formDataToSend = new FormData();
      Object.entries({
        ...formData,
        area: totalSqft,
        totalPrice: parseFloat(formData.totalPrice),
        phone: parseInt(formData.phone, 10),
        width: parseFloat(formData.width),
        length: parseFloat(formData.length),
      }).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      images.forEach((img) => {
        formDataToSend.append("media", img);
      });

      console.log("Submitting form data to http://localhost:5000/api/seller:", Object.fromEntries(formDataToSend));

      try {
        const response = await axios.post(
          "http://localhost:5000/api/seller",
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Submission success:", response.data);
        toast.success("Your property has been listed successfully!");
        setFormData({ propertyType: selectedCategory });
        setImages([]);
        setErrors({});
      } catch (error) {
        console.error("Submission error:", error.response?.data || error.message);
        if (error.response?.data?.errors) {
          const errorMessages = error.response.data.errors.map(err => `${err.field}: ${err.message}`).join(", ");
          toast.error(`Failed to list property: ${errorMessages}`);
        } else {
          toast.error(`Failed to list property: ${error.response?.data?.message || error.message}`);
        }
      }
    } else {
      console.log("Validation errors:", err);
      toast.error("Please fill all required fields correctly.");
    }
  };

  const handleMediaUpload = (e) => {
    const files = Array.from(e.target.files).filter(
      (file) => file.type.startsWith("image/") || file.type.startsWith("video/")
    );
    if (files.length > 10) {
      toast.error("You can upload a maximum of 10 files.");
      return;
    }
    setImages(files);
  };

  return (
    <Container>
      <Banner>
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

        <div
          style={{
            textAlign: "center",
            marginTop: "60px",
            marginBottom: "20px",
          }}
        >
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
            className={selectedCategory === cat.value ? "active" : ""}
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

      <h2 style={{ marginBottom: "1rem" }}>
        Property Details –{" "}
        {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
      </h2>

      <FormWrapper onSubmit={handleSubmit}>
        <label>Your Name*</label>
        <input
          type="text"
          name="name"
          value={formData.name || ""}
          onChange={handleChange}
        />
        {errors.name && <span>{errors.name}</span>}

        <label>Phone Number*</label>
        <input
          type="number"
          name="phone"
          value={formData.phone || ""}
          onChange={handleChange}
        />
        {errors.phone && <span>{errors.phone}</span>}

        <label>Title*</label>
        <input
          type="text"
          name="title"
          value={formData.title || ""}
          onChange={handleChange}
        />
        {errors.title && <span>{errors.title}</span>}

        <label>Location*</label>
        <input
          type="text"
          name="location"
          value={formData.location || ""}
          onChange={handleChange}
        />
        {errors.location && <span>{errors.location}</span>}

        <label>Taluka*</label>
        <input
          type="text"
          name="taluka"
          value={formData.taluka || ""}
          onChange={handleChange}
        />
        {errors.taluka && <span>{errors.taluka}</span>}

        <label>Description*</label>
        <textarea
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
        />
        {errors.description && <span>{errors.description}</span>}

        <label>Size (Width x Length in feet)*</label>
        <div className="flex">
          <input
            type="number"
            name="width"
            placeholder="Width"
            value={formData.width || ""}
            onChange={handleChange}
            min="0.01"
            step="0.01"
          />
          <input
            type="number"
            name="length"
            placeholder="Length"
            value={formData.length || ""}
            onChange={handleChange}
            min="0.01"
            step="0.01"
          />
        </div>
        {(errors.width || errors.length) && <span>{errors.width || errors.length}</span>}

        <label>Area (Sqft)</label>
        <input
          type="number"
          readOnly
          value={
            formData.width && formData.length
              ? parseFloat(formData.width) * parseFloat(formData.length)
              : ""
          }
        />

        <label>Total Price (₹)*</label>
        <input
          type="number"
          name="totalPrice"
          value={formData.totalPrice || ""}
          onChange={handleChange}
          min="0.01"
          step="0.01"
        />
        {errors.totalPrice && <span>{errors.totalPrice}</span>}

        {selectedCategory === "flat" && (
          <>
            <label>BHK</label>
            <select
              name="bhk"
              value={formData.bhk || ""}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="1 BHK">1 BHK</option>
              <option value="2 BHK">2 BHK</option>
              <option value="3 BHK">3 BHK</option>
              <option value="4+ BHK">4+ BHK</option>
            </select>
          </>
        )}

        {selectedCategory === "shop" && (
          <>
            <label>Floor</label>
            <input
              type="text"
              name="floor"
              value={formData.floor || ""}
              onChange={handleChange}
            />
            {errors.floor && <span>{errors.floor}</span>}
          </>
        )}

        <label>Property Type</label>
        <input
          type="text"
          name="propertyType"
          readOnly
          value={formData.propertyType || ""}
        />

        <label>Upload Images/Videos (Max 10)*</label>
        <input
          type="file"
          name="media"
          multiple
          accept="image/*,video/*"
          onChange={handleMediaUpload}
        />

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginTop: "10px",
          }}
        >
          {images.length > 0 &&
            images.map((file, i) => {
              const url = URL.createObjectURL(file);
              const isVideo = file.type.startsWith("video/");
              return isVideo ? (
                <video
                  key={`${file.name}-${i}`}
                  src={url}
                  width="100"
                  height="80"
                  style={{ borderRadius: "8px" }}
                  controls
                />
              ) : (
                <img
                  key={`${file.name}-${i}`}
                  src={url}
                  alt={`preview-${i}`}
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              );
            })}
        </div>

        <button type="submit">Submit Property</button>
      </FormWrapper>
    </Container>
  );
};

export default Sell;