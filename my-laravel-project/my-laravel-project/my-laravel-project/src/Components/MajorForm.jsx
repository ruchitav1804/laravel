import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const MajorForm = () => {
  const [majorName, setMajorName] = useState("");
  const navigate = useNavigate();
  const { id } = useParams(); // Get ID from route for edit

  // If editing, fetch major details
  useEffect(() => {
    if (id) {
      axios
        .get(`http://127.0.0.1:8000/api/majors/${id}`)
        .then((response) => setMajorName(response.data.name))
        .catch((error) => {
          console.error("Fetch major error:", error);
          alert("Failed to fetch major details.");
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!majorName.trim()) {
      alert("Major name cannot be empty!");
      return;
    }

    if (id) {
      // Update existing major
      axios
        .put(`http://127.0.0.1:8000/api/majors/${id}`, { name: majorName })
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
        .post("http://127.0.0.1:8000/api/majors", { name: majorName })
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
