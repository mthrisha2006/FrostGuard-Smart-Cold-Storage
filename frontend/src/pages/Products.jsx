import { useState } from "react";
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
  const addProduct = () => {
    if (productName.trim() === "") {
      alert("Please enter product name");
      return;
    }

    if (editId !== null) {
      const updatedProducts = products.map((product) =>
        product.id === editId
          ? {
              ...product,
              name: productName,
              category: category,
              quantity: quantity,
              storage: storage,
              expiryDate: expiryDate,
            }
          : product
      );

      setProducts(updatedProducts);
      setEditId(null);
    } else {
      const newProduct = {
  id: Date.now(),
  name: productName,
  category: category,
  quantity: quantity,
  storage: storage,
  expiryDate: expiryDate,
  status: "New",
};
      setProducts([...products, newProduct]);
    }

    setProductName("");
    setCategory("");
    setQuantity("");
    setStorage("");
    setExpiryDate("");
    setShowForm(false);
  };

  // DELETE PRODUCT
  const deleteProduct = (id) => {
    const updatedProducts = products.filter(
      (product) => product.id !== id
    );

    setProducts(updatedProducts);
  };

  // EDIT PRODUCT
  const editProduct = (product) => {
    setEditId(product.id);
    setProductName(product.name);
    setCategory(product.category);
    setQuantity(product.quantity);
    setStorage(product.storage);
    setExpiryDate(product.expiryDate);
    setShowForm(true);
  };

  const filteredProducts = products.filter((product) =>
  product.name.toLowerCase().includes(search.toLowerCase()) &&
  (filterCategory === "" || product.category === filterCategory)
);

  return (
    <div className="products-page">

      {/* Header */}
      <div className="products-header">
        <div>
          <h1>Product Management</h1>
          <p>Manage all products stored in FrostGuard.</p>
        </div>

        <button
          className="add-btn"
          onClick={() => {
            setEditId(null);
            setProductName("");
            setCategory("");
            setQuantity("");
            setStorage("");
            setExpiryDate("");
            setShowForm(true);
          }}
        >
          + Add Product
        </button>
      </div>

      {/* Add / Edit Product Form */}
      {showForm && (
        <div className="form-box">
          <h2>
            {editId !== null ? "Edit Product" : "Add New Product"}
          </h2>

          <input
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="Fruits">Fruits</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Dairy">Dairy</option>
            <option value="Meat">Meat</option>
            <option value="Frozen Foods">Frozen Foods</option>
          </select>

          <input
            type="text"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          <input
            type="text"
            placeholder="Storage Location"
            value={storage}
            onChange={(e) => setStorage(e.target.value)}
          />

          <input
            type="text"
            placeholder="Expiry Date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
          />

          <div className="form-buttons">
            <button
              className="save-btn"
              onClick={addProduct}
            >
              {editId !== null
                ? "Update Product"
                : "Save Product"}
            </button>

            <button
              className="cancel-btn"
              onClick={() => {
                setShowForm(false);
                setEditId(null);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="product-tools">
        <input
          type="text"
          placeholder="🔍 Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      <select
  value={filterCategory}
  onChange={(e) => setFilterCategory(e.target.value)}
>
  <option value="">All Categories</option>
  <option value="Fruits">Fruits</option>
  <option value="Vegetables">Vegetables</option>
  <option value="Dairy">Dairy</option>
  <option value="Meat">Meat</option>
  <option value="Frozen Foods">Frozen Foods</option>
</select>
      </div>

      {/* Product Table */}
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

            {filteredProducts.map((product) => (
              <tr key={product.id}>

                <td>P00{product.id}</td>

                <td>{product.name}</td>

                <td>{product.category}</td>

                <td>{product.quantity}</td>

                <td>{product.storage}</td>

                <td>{product.expiryDate}</td>

                <td>
                  <span
                    className={
                      product.status === "Expiring"
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
                    onClick={() => editProduct(product)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete"
                    onClick={() => deleteProduct(product.id)}
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}

          </tbody>
        </table>
      </div>

    </div>
  );
}

export default Products;