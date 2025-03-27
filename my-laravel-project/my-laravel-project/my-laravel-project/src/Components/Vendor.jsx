import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Vendors = () => {
  const [vendors, setVendors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = () => {
    axios
      .get("http://127.0.0.1:8000/api/vendors")
      .then((response) => setVendors(response.data))
      .catch((error) => console.log(error));
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this vendor?")) return;

    axios
      .delete(`http://127.0.0.1:8000/api/vendors/${id}`)
      .then(() => {
        alert("Vendor deleted successfully!");
        fetchVendors();
      })
      .catch((error) => {
        console.error("Delete error:", error);
        alert("Failed to delete vendor.");
      });
  };

  const filteredVendors = vendors.filter((vendor) =>
    vendor.vendor_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.business_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <h2>Vendors List</h2>
        <Link to="/vendors/new">
          <button style={{ padding: "10px 20px", backgroundColor: "#4CAF50", color: "#fff", border: "none", cursor: "pointer" }}>
            Add Vendor
          </button>
        </Link>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by Vendor or Business Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "8px", width: "300px" }}
        />
      </div>

      <table border="1" cellPadding="10" cellSpacing="0" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead style={{ backgroundColor: "#f2f2f2" }}>
          <tr>
            <th>ID</th>
            <th>Vendor Code</th>
            <th>Vendor Name</th>
            <th>Contact Number</th>
            <th>Vendor Email</th>
            <th>Vendor Address</th>
            <th>Business Name</th>
            <th>Business Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredVendors.length > 0 ? (
            filteredVendors.map((vendor) => (
              <tr key={vendor.id}>
                <td>{vendor.id}</td>
                <td>{vendor.vendor_code}</td>
                <td>{vendor.vendor_name}</td>
                <td>{vendor.contact_number}</td>
                <td>{vendor.vendor_email}</td>
                <td>{vendor.vendor_address}</td>
                <td>{vendor.business_name}</td>
                <td>{vendor.business_number}</td>
                <td>
                  <button
                    onClick={() => navigate(`/vendors/edit/${vendor.id}`)}
                    style={{
                      marginRight: "10px",
                      padding: "5px 10px",
                      backgroundColor: "#2196F3",
                      color: "#fff",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(vendor.id)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#f44336",
                      color: "#fff",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No vendors found!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Vendors;
