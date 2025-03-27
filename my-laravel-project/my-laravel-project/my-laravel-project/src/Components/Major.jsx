import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Major = () => {
  const [majors, setMajors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMajors();
  }, []);

  const fetchMajors = () => {
    axios
      .get("http://127.0.0.1:8000/api/majors")
      .then((response) => {
        console.log("API Response:", response.data); // check this in the console

        // Adjust according to your response structure!
        if (Array.isArray(response.data)) {
          setMajors(response.data); // if it returns an array
        } else if (response.data.data) {
          setMajors(response.data.data); // if response has a data key
        } else if (response.data.majors) {
          setMajors(response.data.majors); // if response has a majors key
        } else {
          console.warn("Unexpected response format:", response.data);
          setMajors([]); // fallback to empty array
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  const handleDeleteMajor = (id) => {
    if (!window.confirm("Are you sure you want to delete this major?")) return;

    axios
      .delete(`http://127.0.0.1:8000/api/majors/${id}`)
      .then(() => {
        alert("Major deleted successfully!");
        fetchMajors(); // Refresh list
      })
      .catch((error) => {
        console.error("Delete error:", error);
        alert("Failed to delete major.");
      });
  };

  return (
    <div>
      <h2>Majors</h2>

      <button onClick={() => navigate("/majors/create")}>Add Major</button>

      {Array.isArray(majors) && majors.length > 0 ? (
        <ul>
          {majors.map((major) => (
            <li key={major.id}>
              {major.name}{" "}
              <button onClick={() => navigate(`/majors/edit/${major.id}`)}>
                Edit
              </button>{" "}
              <button onClick={() => handleDeleteMajor(major.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No majors found.</p>
      )}
    </div>
  );
};

export default Major;
