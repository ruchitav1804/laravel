import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Minor = () => {
  const [minors, setMinors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMinors();
  }, []);

  const fetchMinors = () => {
    axios
      .get("http://127.0.0.1:8000/api/minors")
      .then((response) => {
        console.log("API Response:", response.data);

        // If your API response is { data: [...] }, get data; else use response directly
        const data = Array.isArray(response.data)
          ? response.data
          : response.data.data;

        setMinors(data || []);
      })
      .catch((error) => console.log(error));
  };

  const handleDeleteMinor = (id) => {
    if (!window.confirm("Are you sure you want to delete this minor?")) return;

    axios
      .delete(`http://127.0.0.1:8000/api/minors/${id}`)
      .then(() => {
        alert("Minor deleted successfully!");
        fetchMinors();
      })
      .catch((error) => {
        console.error("Delete error:", error);
        alert("Failed to delete minor.");
      });
  };

  return (
    <div >
      <h2 >Minors</h2>

      <button  onClick={() => navigate("/minors/create")}>
        Add Minor
      </button>

      <ul >
        {Array.isArray(minors) && minors.length > 0 ? (
          minors.map((minor) => (
            <li key={minor.id} >
              <div>
                <strong>Minor:</strong> {minor.name}
              </div>
              <div>
                <strong>Major:</strong>{" "}
                {minor.major ? minor.major.name : "No Major Assigned"}
              </div>

              <div >
                <button
                  onClick={() => navigate(`/minors/edit/${minor.id}`)}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteMinor(minor.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <li>No minors found.</li>
        )}
      </ul>
    </div>
  );
};


export default Minor;
