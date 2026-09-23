require("dotenv").config();
console.log("ENV CHECK");
console.log("DB HOST:", process.env.DB_HOST);
console.log("DB USER:", process.env.DB_USER);
console.log("DB PASSWORD EXISTS:", !!process.env.DB_PASSWORD);
console.log("DB PASSWORD LENGTH:", process.env.DB_PASSWORD?.length);
console.log("DB NAME:", process.env.DB_NAME);
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();

app.use(cors());
app.use(express.json());
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
app.get("/", (req, res) => {
  res.send("FrostGuard Backend is running!");
});
app.get("/api/test-db", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT 1 AS result"
    );

    res.json({
      success: true,
      message: "MySQL Database Connected Successfully",
      data: rows,
    });

  } catch (error) {
    console.error(
      "DATABASE CONNECTION ERROR:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Database connection failed",
      error: error.message,
    });
  }
});

// Get All Products
app.get("/api/products", async (req, res) => {
  try {
    const [products] = await pool.query(
      "SELECT * FROM products ORDER BY id ASC"
    );

    res.json({
      success: true,
      data: products,
    });

  } catch (error) {
    console.error(
      "PRODUCT FETCH ERROR:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
});
// Add New Product
app.post("/api/products", async (req, res) => {
  try {
    const {
      name,
      category,
      quantity,
      storage,
      expiry_date,
      status,
    } = req.body;

    if (
      !name ||
      !category ||
      !quantity ||
      !storage ||
      !expiry_date
    ) {
      return res.status(400).json({
        success: false,
        message: "All product fields are required",
      });
    }

    const [result] = await pool.query(
      `INSERT INTO products
      (name, category, quantity, storage, expiry_date, status)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        name,
        category,
        quantity,
        storage,
        expiry_date,
        status || "Good",
      ]
    );

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      id: result.insertId,
    });

  } catch (error) {
    console.error(
      "PRODUCT INSERT ERROR:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to add product",
      error: error.message,
    });
  }
}); 
// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `FrostGuard Backend running on http://localhost:${PORT}`
  );
});