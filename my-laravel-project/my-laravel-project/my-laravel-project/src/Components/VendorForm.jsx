import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const VendorForm = () => {
  const [vendorForm, setVendorForm] = useState({
    vendor_code: "",
    vendor_name: "",
    contact_number: "",
    vendor_email:"",
    vendor_address:"",
    business_name: "",
    business_number: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch vendor data if editing
  useEffect(() => {
    if (id) {
      setLoading(true);
      axios
        .get(`http://127.0.0.1:8000/api/vendors/${id}`)
        .then((response) => {
          console.log("Vendor fetched:", response.data);

          // If the backend returns the vendor directly, this works.
          // If it's wrapped (e.g., { vendor: { ... } }), you need to adjust.
          const vendorData = response.data;

          if (!vendorData) {
            alert("Vendor not found!");
            navigate("/vendors");
            return;
          }

          setVendorForm({
            vendor_code: vendorData.vendor_code || "",
            vendor_name: vendorData.vendor_name || "",
            contact_number: vendorData.contact_number || "",
            vendor_email: vendorData.vendor_email || "",
            vendor_address: vendorData.vendor_address || "",
            business_name: vendorData.business_name || "",
            business_number: vendorData.business_number || "",
          });
        })
        .catch((error) => {
          console.error("Fetch error:", error);
          alert("Failed to load vendor data.");
          navigate("/vendors");
        })
        .finally(() => setLoading(false));
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    setVendorForm({
      ...vendorForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !vendorForm.vendor_code.trim() ||
      !vendorForm.vendor_name.trim() ||
      !vendorForm.contact_number.trim() ||
      !vendorForm.vendor_email.trim() ||
      !vendorForm.vendor_address.trim() ||
      !vendorForm.business_name.trim() ||
      !vendorForm.business_number.trim()
    ) {
      alert("Please fill all fields!");
      return;
    }

    const apiUrl = id
      ? `http://127.0.0.1:8000/api/vendors/${id}`
      : "http://127.0.0.1:8000/api/vendors";

    const request = id
      ? axios.put(apiUrl, vendorForm)
      : axios.post(apiUrl, vendorForm);

    request
      .then(() => {
        alert(`Vendor ${id ? "updated" : "added"} successfully!`);
        navigate("/vendors"); // Redirect to vendor list page (update route as needed)
      })
      .catch((error) => {
        console.error("Submit error:", error);
        alert(`Failed to ${id ? "update" : "add"} vendor.`);
      });
  };

  if (loading) {
    return <div style={{ padding: "20px" }}>Loading vendor data...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>{id ? "Edit Vendor" : "Add Vendor"}</h2>

      <form onSubmit={handleSubmit} style={{ maxWidth: "500px" }}>
        {/* Vendor Code */}
        <div style={{ marginBottom: "10px" }}>
          <label>Vendor Code</label>
          <input
            type="text"
            name="vendor_code"
            value={vendorForm.vendor_code}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        {/* Vendor Name */}
        <div style={{ marginBottom: "10px" }}>
          <label>Vendor Name</label>
          <input
            type="text"
            name="vendor_name"
            value={vendorForm.vendor_name}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        {/* Contact Number */}
        <div style={{ marginBottom: "10px" }}>
          <label>Contact Number</label>
          <input
            type="text"
            name="contact_number"
            value={vendorForm.contact_number}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Vendor Email</label>
          <input
            type="text"
            name="vendor_email"
            value={vendorForm.vendor_email}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        {/* Vendor Address */}
        <div style={{ marginBottom: "10px" }}>
          <label>Vendor Address</label>
          <input
            type="text"
            name="vendor_address"
            value={vendorForm.vendor_address}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        {/* Business Name */}
        <div style={{ marginBottom: "10px" }}>
          <label>Business Name</label>
          <input
            type="text"
            name="business_name"
            value={vendorForm.business_name}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        {/* Business Number */}
        <div style={{ marginBottom: "10px" }}>
          <label>Business Number</label>
          <input
            type="text"
            name="business_number"
            value={vendorForm.business_number}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <button type="submit" style={{ padding: "10px 20px" }}>
          {id ? "Update Vendor" : "Add Vendor"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/vendors")} // Update route if needed
          style={{
            marginLeft: "10px",
            padding: "10px 20px",
            backgroundColor: "#ccc",
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default VendorForm;
