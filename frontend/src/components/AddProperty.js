import React, { useState, useEffect } from "react";
import axios from "axios";

const AddProperty = () => {
  const [properties, setProperties] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPropertyId, setCurrentPropertyId] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [contact, setContact] = useState("");

  // Fetch properties on component mount
  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const res = await axios.get("http://localhost:5000/properties");
      setProperties(res.data);
    } catch (err) {
      console.error("Error fetching properties:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (isEditMode) {
        // Update existing property
        await axios.put(
          `http://localhost:5000/properties/${currentPropertyId}`,
          { title, description, image, contact },
          { headers: { Authorization: token } }
        );
        alert("Property updated successfully!");
      } else {
        // Add new property
        await axios.post(
          "http://localhost:5000/properties",
          { title, description, image, contact },
          { headers: { Authorization: token } }
        );
        alert("Property added successfully!");
      }
      resetForm();
      fetchProperties();
    } catch (err) {
      alert("Failed to save property");
    }
  };

  const handleEdit = (property) => {
    setTitle(property.title);
    setDescription(property.description);
    setImage(property.image);
    setContact(property.contact);
    setCurrentPropertyId(property._id);
    setIsEditMode(true);
  };

  const handleDelete = async (propertyId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/properties/${propertyId}`, {
        headers: { Authorization: token },
      });
      alert("Property deleted successfully!");
      fetchProperties();
    } catch (err) {
      alert("Failed to delete property");
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setImage("");
    setContact("");
    setIsEditMode(false);
    setCurrentPropertyId(null);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>{isEditMode ? "Edit Property" : "Add Property"}</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="url"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
        />
        <button type="submit">{isEditMode ? "Update" : "Add"} Property</button>
        {isEditMode && <button onClick={resetForm}>Cancel</button>}
      </form>

      <h3>Property List</h3>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {properties.map((property) => (
          <div
            key={property._id}
            style={{
              border: "1px solid #ccc",
              margin: "10px",
              padding: "10px",
              width: "300px",
            }}
          >
            <img
              src={property.image}
              alt={property.title}
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
            <h4>{property.title}</h4>
            <p>{property.description}</p>
            <p>Contact: {property.contact}</p>
            <button onClick={() => handleEdit(property)}>Edit</button>
            <button onClick={() => handleDelete(property._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddProperty;
