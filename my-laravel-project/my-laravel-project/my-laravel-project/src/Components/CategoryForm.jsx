import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const CategoryForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const categoryToEdit = location.state || null;

  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    if (categoryToEdit) {
      setCategoryName(categoryToEdit.name);
    }
  }, [categoryToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      alert("Category name cannot be empty!");
      return;
    }

    if (categoryToEdit) {
      // Update category
      axios
        .put(`http://127.0.0.1:8000/api/categories/${categoryToEdit.id}`, {
          name: categoryName,
        })
        .then((response) => {
          alert("Category updated successfully!");
          navigate("/categories");
        })
        .catch((error) => {
          console.error("Update Error:", error);
          alert("Failed to update category");
        });
    } else {
      // Add new category
      axios
        .post("http://127.0.0.1:8000/api/categories", {
          name: categoryName,
        })
        .then((response) => {
          alert("Category added successfully!");
          navigate("/categories");
        })
        .catch((error) => {
          console.error("Add Error:", error);
          alert("Failed to add category");
        });
    }
  };

  return (
    <div>
      <h2>{categoryToEdit ? "Edit Category" : "Add New Category"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          required
        />
        <button type="submit">
          {categoryToEdit ? "Update Category" : "Add Category"}
        </button>
      </form>

      <button onClick={() => navigate("/categories")}>Cancel</button>
    </div>
  );
};

export default CategoryForm;
