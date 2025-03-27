import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const MajorForm = () => {
  const [majorName, setMajorName] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  // Get token from localStorage
  const token = localStorage.getItem("TOKEN");

  // Fetch major details for edit
  useEffect(() => {
    if (id) {
      axios
        .get(`http://127.0.0.1:8000/api/majors/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Add token to GET request
          },
        })
        .then((response) => setMajorName(response.data.name))
        .catch((error) => {
          console.error("Fetch major error:", error);
          alert("Failed to fetch major details.");
        });
    }
  }, [id, token]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!majorName.trim()) {
      alert("Major name cannot be empty!");
      return;
    }

    const requestData = { name: majorName };

    if (id) {
      // Update existing major
      axios
        .put(`http://127.0.0.1:8000/api/majors/${id}`, requestData, {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Add token to PUT request
          },
        })
        .then(() => {
          alert("Major updated successfully!");
          navigate("/majors");
        })
        .catch((error) => {
          console.error("Update error:", error);
          alert("Failed to update major.");
        });
    } else {
      // Create new major
      axios
        .post(`http://127.0.0.1:8000/api/majors`, requestData, {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Add token to POST request
          },
        })
        .then(() => {
          alert("Major created successfully!");
          navigate("/majors");
        })
        .catch((error) => {
          console.error("Create error:", error);
          alert("Failed to create major.");
        });
    }
  };

  return (
    <div>
      <h2>{id ? "Edit Major" : "Add Major"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter major name"
          value={majorName}
          onChange={(e) => setMajorName(e.target.value)}
          required
        />
        <button type="submit">{id ? "Update" : "Add"}</button>
      </form>

      <button onClick={() => navigate("/majors")}>Cancel</button>
    </div>
  );
};

export default MajorForm;
