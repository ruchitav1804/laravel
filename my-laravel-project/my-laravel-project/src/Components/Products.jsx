import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Products.css";


const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get("http://127.0.0.1:8000/api/products")
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      axios
        .delete(`http://127.0.0.1:8000/api/products/${id}`)
        .then(() => {
          const updatedProducts = products.filter(
            (product) => product.id !== id
          );
          setProducts(updatedProducts);
          setFilteredProducts(updatedProducts);
        })
        .catch((error) => console.log(error));
    }
  };

  const handleSearch = () => {
    let filtered = products;

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          (product.asset_number &&
            product.asset_number.toLowerCase().includes(query)) ||
          (product.vendor_name &&
            product.vendor_name.toLowerCase().includes(query)) ||
          (product.description &&
            product.description.toLowerCase().includes(query))
      );
    }

    if (searchCategory.trim() !== "") {
      filtered = filtered.filter(
        (product) =>
          product.category_id &&
          product.category_id.toString() === searchCategory
      );
    }

    if (startDate || endDate) {
      filtered = filtered.filter((product) => {
        const productDate = new Date(product.date_added);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        if (start && end) {
          return productDate >= start && productDate <= end;
        } else if (start) {
          return productDate >= start;
        } else if (end) {
          return productDate <= end;
        }

        return true;
      });
    }

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    handleSearch();
  }, [searchQuery, searchCategory, startDate, endDate]);

  const clearFilters = () => {
    setSearchQuery("");
    setSearchCategory("");
    setStartDate("");
    setEndDate("");
    setFilteredProducts(products);
  };

  return (
    <div className="product-container">
      <div className="product-header">
        <h2>Products</h2>
        <Link to="/products/new">
          <button className="add-product-btn">Add Product</button>
        </Link>
      </div>

      {/* Search Filters Section */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Asset No, Vendor Name, etc."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <input
          type="text"
          placeholder="Search by Category ID"
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
        />

        {/* Start Date with label */}
        <div className="date-filter">
          <label htmlFor="start-date">Start Date:</label>
          <input
            type="date"
            id="start-date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        {/* End Date with label */}
        <div className="date-filter">
          <label htmlFor="end-date">End Date:</label>
          <input
            type="date"
            id="end-date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        {/* <button className="clear-filters-btn" onClick={clearFilters}>
          Clear Filters
        </button> */}
      </div>

      {/* Product Table */}
      <div className="table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>Asset Number</th>
              <th>Vendor Code</th>
              <th>Vendor Name</th>
              <th>Major</th>
              <th>Minor</th>
              <th>Asset Category</th>
              <th>Asset Cost</th>
              <th>Date Placed in Service</th>
              <th>Deprn Method Code</th>
              <th>Original Cost</th>
              <th>Current Cost</th>
              <th>Accumulated Depreciation</th>
              <th>Depreciation Amount</th>
              <th>YTD Depreciation</th>
              <th>Period Name</th>
              <th>Quantity</th>
              <th>Life in Months</th>
              <th>Description</th>
              <th>Cost Account Description</th>
              <th>Accumulated Account Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.asset_number}</td>
                  <td>{product.vendor_code}</td>
                  <td>{product.vendor_name}</td>
                  <td>{product.major}</td>
                  <td>{product.minor}</td>
                  <td>{product.category_id}</td>
                  <td>{product.asset_cost}</td>
                  <td>{product.date_added}</td>
                  <td>{product.deprn_method_code}</td>
                  <td>{product.original_cost}</td>
                  <td>{product.current_cost}</td>
                  <td>{product.accumulated_deprn}</td>
                  <td>{product.deprn_amount}</td>
                  <td>{product.ytd_deprn}</td>
                  <td>{product.period_name}</td>
                  <td>{product.quantity}</td>
                  <td>{product.life_in_months}</td>
                  <td>{product.description}</td>
                  <td>{product.cost_account_description}</td>
                  <td>{product.accumulated_account_description}</td>
                  <td>
                    <Link to={`/products/edit/${product.id}`}>
                      <button className="edit-btn">Edit</button>
                    </Link>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="21">No products found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Placeholder */}
      <div className="pagination">
        <button className="active">1</button>
        <button>2</button>
        <button>3</button>
      </div>
    </div>
  );
};

export default Products;
