import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios
      .get("http://127.0.0.1:8000/api/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.log(error));
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    axios
      .delete(`http://127.0.0.1:8000/api/categories/${id}`)
      .then(() => {
        alert("Category deleted successfully");
        fetchCategories(); // Refresh list
      })
      .catch((error) => {
        console.error("Delete Error:", error);
        alert("Failed to delete category");
      });
  };

  const handleEdit = (category) => {
    navigate(`/edit-category/${category.id}`, { state: category });
  };

  return (
    <div>
      <h2>Categories</h2>

      <Link to="/add-category">
        <button>Add Category</button>
      </Link>

      {categories.length === 0 ? (
        <p>No categories found.</p>
      ) : (
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              {category.name} &nbsp;
              <button onClick={() => handleEdit(category)}>Edit</button> &nbsp;
              <button onClick={() => handleDelete(category.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Category;
