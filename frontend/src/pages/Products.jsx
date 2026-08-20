import { useState } from "react";
import "./Products.css";

function Products() {
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const addProduct = () => {
  if (productName.trim() === "") {
    alert("Please enter product name");
    return;
  }

  const newProduct = {
    id: products.length + 1,
    name: productName
  };

  setProducts([...products, newProduct]);
  setProductName("");
  setShowForm(false);
};
  return (
    <div className="products-page">

      <div className="products-header">
        <div>
          <h1>Product Management</h1>
          <p>Manage all products stored in FrostGuard.</p>
        </div>

        <button
          className="add-btn"
          onClick={() => setShowForm(true)}
        >
          + Add Product
        </button>
      </div>

      {showForm && (
        <div className="form-box">
          <h2>Add New Product</h2>
          <input
  type="text"
  placeholder="Product Name"
  value={productName}
  onChange={(e) => setProductName(e.target.value)}
  />
          <select>
            <option>Select Category</option>
            <option>Fruits</option>
            <option>Vegetables</option>
            <option>Dairy</option>
            <option>Meat</option>
            <option>Frozen Foods</option>
          </select>
          <input type="number" placeholder="Quantity" />

          <input type="text" placeholder="Storage Location" />

          <input type="date" />

          <div className="form-buttons">
            <button className="save-btn" onClick={addProduct}>
            Save Product
              </button>
            <button
              className="cancel-btn"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="product-tools">
        <input
          type="text"
          placeholder="🔍 Search product..."
        />

        <select>
          <option>All Categories</option>
          <option>Fruits</option>
          <option>Vegetables</option>
          <option>Dairy</option>
          <option>Meat</option>
          <option>Frozen Foods</option>
        </select>
      </div>

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
            <tr>
              <td>P001</td>
              <td>Fresh Apples</td>
              <td>Fruits</td>
              <td>250 kg</td>
              <td>Cold Room A</td>
              <td>25-08-2026</td>
              <td>
                <span className="good">Good</span>
              </td>
              <td>
                <button className="edit">Edit</button>
                <button className="delete">Delete</button>
              </td>
            </tr>

            <tr>
              <td>P002</td>
              <td>Milk</td>
              <td>Dairy</td>
              <td>180 L</td>
              <td>Cold Room B</td>
              <td>20-08-2026</td>
              <td>
                <span className="warning">Expiring</span>
              </td>
              <td>
                <button className="edit">Edit</button>
                <button className="delete">Delete</button>
              </td>
            </tr>

            <tr>
              <td>P003</td>
              <td>Frozen Chicken</td>
              <td>Meat</td>
              <td>320 kg</td>
              <td>Freezer A</td>
              <td>15-12-2026</td>
              <td>
                <span className="good">Good</span>
              </td>
              <td>
                <button className="edit">Edit</button>
                <button className="delete">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default Products;