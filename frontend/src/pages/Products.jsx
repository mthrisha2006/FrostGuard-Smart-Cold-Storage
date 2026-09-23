import { useEffect, useState } from "react";
import "./Products.css";

function Products({ products, setProducts }) {
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [storage, setStorage] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  // Get products from MySQL
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setProducts(result.data);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch products:", error);
      });
  }, [setProducts]);

  const getProductStatus = (date) => {
    if (!date) return "Good";

    const today = new Date();
    const expiry = new Date(date);

    today.setHours(0, 0, 0, 0);
    expiry.setHours(0, 0, 0, 0);

    if (expiry < today) return "Expired";

    const difference =
      (expiry - today) / (1000 * 60 * 60 * 24);

    if (difference <= 7) return "Expiring";

    return "Good";
  };

  const resetForm = () => {
    setProductName("");
    setCategory("");
    setQuantity("");
    setStorage("");
    setExpiryDate("");
    setEditId(null);
    setShowForm(false);
  };

  // Add Product to MySQL
  const saveProduct = async () => {
    if (productName.trim() === "") {
      alert("Please enter product name");
      return;
    }

    if (category === "") {
      alert("Please select a category");
      return;
    }

    if (quantity.trim() === "") {
      alert("Please enter quantity");
      return;
    }

    if (storage.trim() === "") {
      alert("Please enter storage location");
      return;
    }

    if (expiryDate === "") {
      alert("Please select expiry date");
      return;
    }

    const status = getProductStatus(expiryDate);

    // Edit will be connected next
    if (editId !== null) {
      alert("Edit API will be connected next.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: productName.trim(),
            category,
            quantity: quantity.trim(),
            storage: storage.trim(),
            expiry_date: expiryDate,
            status,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        alert(result.message || "Failed to add product");
        return;
      }

      alert("Product added successfully!");

      // Refresh products from MySQL
      const productsResponse = await fetch(
        "http://localhost:5000/api/products"
      );

      const productsResult =
        await productsResponse.json();

      if (productsResult.success) {
        setProducts(productsResult.data);
      }

      resetForm();

    } catch (error) {
      console.error("ADD PRODUCT ERROR:", error);
      alert("Backend server connection failed");
    }
  };

  const deleteProduct = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    const updatedProducts = products.filter(
      (product) => product.id !== id
    );

    setProducts(updatedProducts);
  };

  const editProduct = (product) => {
    setEditId(product.id);
    setProductName(product.name);
    setCategory(product.category);
    setQuantity(product.quantity);
    setStorage(product.storage);

    // Convert database date to YYYY-MM-DD
    if (product.expiry_date) {
      setExpiryDate(
        new Date(product.expiry_date)
          .toISOString()
          .split("T")[0]
      );
    } else {
      setExpiryDate("");
    }

    setShowForm(true);
  };

  const openAddForm = () => {
    setEditId(null);
    setProductName("");
    setCategory("");
    setQuantity("");
    setStorage("");
    setExpiryDate("");
    setShowForm(true);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      filterCategory === "" ||
      product.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="products-page">

      {/* Header */}
      <div className="products-header">
        <div>
          <h1>Product Management</h1>
          <p>
            Manage all products stored in FrostGuard.
          </p>
        </div>

        <button
          className="add-btn"
          onClick={openAddForm}
        >
          + Add Product
        </button>
      </div>

      {/* Add / Edit Form */}
      {showForm && (
        <div className="form-box">

          <h2>
            {editId !== null
              ? "Edit Product"
              : "Add New Product"}
          </h2>

          <input
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={(e) =>
              setProductName(e.target.value)
            }
          />

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >
            <option value="">
              Select Category
            </option>

            <option value="Fruits">
              Fruits
            </option>

            <option value="Vegetables">
              Vegetables
            </option>

            <option value="Dairy">
              Dairy
            </option>

            <option value="Meat">
              Meat
            </option>

            <option value="Frozen Foods">
              Frozen Foods
            </option>
          </select>

          <input
            type="text"
            placeholder="Quantity (example: 250 kg)"
            value={quantity}
            onChange={(e) =>
              setQuantity(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Storage Location"
            value={storage}
            onChange={(e) =>
              setStorage(e.target.value)
            }
          />

          <input
            type="date"
            value={expiryDate}
            onChange={(e) =>
              setExpiryDate(e.target.value)
            }
          />

          <div className="form-buttons">

            <button
              className="save-btn"
              onClick={saveProduct}
            >
              {editId !== null
                ? "Update Product"
                : "Save Product"}
            </button>

            <button
              className="cancel-btn"
              onClick={resetForm}
            >
              Cancel
            </button>

          </div>

        </div>
      )}

      {/* Search and Filter */}
      <div className="product-tools">

        <input
          type="text"
          placeholder="🔍 Search product..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          value={filterCategory}
          onChange={(e) =>
            setFilterCategory(e.target.value)
          }
        >
          <option value="">
            All Categories
          </option>

          <option value="Fruits">
            Fruits
          </option>

          <option value="Vegetables">
            Vegetables
          </option>

          <option value="Dairy">
            Dairy
          </option>

          <option value="Meat">
            Meat
          </option>

          <option value="Frozen Foods">
            Frozen Foods
          </option>
        </select>

      </div>

      {/* Products Table */}
      <div className="product-table">

        <table>

          <thead>
            <tr>
              <th>ID</th>
              <th>Product</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Storage</th>
              <th>Expiry Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {filteredProducts.length === 0 ? (

              <tr>
                <td
                  colSpan="8"
                  className="no-products"
                >
                  No products found
                </td>
              </tr>

            ) : (

              filteredProducts.map((product, index) => (

                <tr key={product.id}>

                  <td>
                    P{String(index + 1).padStart(3, "0")}
                  </td>

                  <td>
                    {product.name}
                  </td>

                  <td>
                    {product.category}
                  </td>

                  <td>
                    {product.quantity}
                  </td>

                  <td>
                    {product.storage}
                  </td>

                  <td>
                    {product.expiry_date
                      ? new Date(
                          product.expiry_date
                        ).toLocaleDateString("en-GB")
                      : "-"}
                  </td>

                  <td>

                    <span
                      className={
                        product.status === "Expired"
                          ? "expired"
                          : product.status === "Expiring"
                          ? "warning"
                          : "good"
                      }
                    >
                      {product.status}
                    </span>

                  </td>

                  <td>

                    <button
                      className="edit"
                      onClick={() =>
                        editProduct(product)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="delete"
                      onClick={() =>
                        deleteProduct(product.id)
                      }
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Products;