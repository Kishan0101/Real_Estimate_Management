import React, { useEffect, useState } from "react";
import axios from "axios";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/properties").then((res) => setProperties(res.data));
  }, []);

  return (
    <div>
      <h1>Property List</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {properties.map((property) => (
          <div key={property._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px", width: "300px" }}>
            <img src={property.image} alt={property.title} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
            <h3>{property.title}</h3>
            <p>{property.description}</p>
            <p>Contact: {property.contact}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyList;
