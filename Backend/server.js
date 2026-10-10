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
const bcrypt = require("bcryptjs");
const app = express();

app.use(cors());
app.use(express.json());

// ==========================================
// MYSQL CONNECTION POOL
// ==========================================

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

// ==========================================
// HOME
// ==========================================

app.get("/", (req, res) => {
  res.send("FrostGuard Backend is running!");
});

// ==========================================
// TEST DATABASE CONNECTION
// ==========================================

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

// ==========================================
// PRODUCTS
// ==========================================

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

// Update Product
app.put("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;

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
      `UPDATE products
       SET name = ?,
           category = ?,
           quantity = ?,
           storage = ?,
           expiry_date = ?,
           status = ?
       WHERE id = ?`,
      [
        name,
        category,
        quantity,
        storage,
        expiry_date,
        status || "Good",
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.error(
      "PRODUCT UPDATE ERROR:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to update product",
      error: error.message,
    });
  }
});

// Delete Product
app.delete("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      "DELETE FROM products WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(
      "PRODUCT DELETE ERROR:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to delete product",
      error: error.message,
    });
  }
});
// ==========================================
// USER REGISTER
// ==========================================

app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(cleanEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid Gmail address",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must contain at least 6 characters",
      });
    }

    const [existingUsers] = await pool.query(
      "SELECT id FROM users WHERE email = ?",
      [cleanEmail]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({
        success: false,
        message: "This Gmail is already registered. Please login.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [cleanName, cleanEmail, hashedPassword]
    );

    res.status(201).json({
      success: true,
      message: "Registration successful. Please login.",
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error.message);

    res.status(500).json({
      success: false,
      message: "Registration failed",
    });
  }
});
// ==========================================
// USER LOGIN
// ==========================================

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(cleanEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid Gmail address",
      });
    }

    const [users] = await pool.query(
      "SELECT id, name, email, password FROM users WHERE email = ?",
      [cleanEmail]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Gmail is not registered. Please register first.",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      users[0].password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    res.json({
      success: true,
      message: "Login successful",
      user: {
        id: users[0].id,
        name: users[0].name,
        email: users[0].email,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error.message);

    res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
});

// ==========================================
// TEMPERATURE MONITORING
// ==========================================

// Get Temperature Logs
app.get("/api/temperature", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        temperature_logs.id,
        temperature_logs.cold_room_id,
        cold_rooms.room_name,
        temperature_logs.temperature,
        temperature_logs.recorded_at
      FROM temperature_logs
      JOIN cold_rooms
        ON temperature_logs.cold_room_id = cold_rooms.id
      ORDER BY temperature_logs.recorded_at DESC
    `);

    res.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error(
      "TEMPERATURE FETCH ERROR:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch temperature logs",
      error: error.message,
    });
  }
});

// Add Temperature Log
app.post("/api/temperature", async (req, res) => {
  try {
    const {
      cold_room_id,
      temperature,
    } = req.body;

    if (
      !cold_room_id ||
      temperature === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Cold room and temperature are required",
      });
    }

    const [result] = await pool.query(
      `INSERT INTO temperature_logs
       (cold_room_id, temperature)
       VALUES (?, ?)`,
      [
        cold_room_id,
        temperature,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Temperature recorded successfully",
      id: result.insertId,
    });
  } catch (error) {
    console.error(
      "TEMPERATURE INSERT ERROR:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to record temperature",
      error: error.message,
    });
  }
});

// ==========================================
// STORAGE MANAGEMENT
// ==========================================

// Get All Storage Units
app.get("/api/storage", async (req, res) => {
  try {
    const [storageUnits] = await pool.query(`
      SELECT
        id,
        room_name,
        location,
        capacity,
        used_capacity,
        temperature,
        status
      FROM cold_rooms
      ORDER BY id ASC
    `);

    res.json({
      success: true,
      data: storageUnits,
    });
  } catch (error) {
    console.error(
      "STORAGE FETCH ERROR:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch storage units",
      error: error.message,
    });
  }
});

// Update Used Storage Capacity
app.put("/api/storage/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { used_capacity } = req.body;

    if (used_capacity === undefined) {
      return res.status(400).json({
        success: false,
        message: "Used capacity is required",
      });
    }

    const [room] = await pool.query(
      "SELECT capacity FROM cold_rooms WHERE id = ?",
      [id]
    );

    if (room.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Storage unit not found",
      });
    }

    if (
      Number(used_capacity) < 0 ||
      Number(used_capacity) > Number(room[0].capacity)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Used capacity must be within the storage capacity",
      });
    }

    const [result] = await pool.query(
      `UPDATE cold_rooms
       SET used_capacity = ?
       WHERE id = ?`,
      [
        used_capacity,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Storage unit not found",
      });
    }

    res.json({
      success: true,
      message: "Storage capacity updated successfully",
    });
  } catch (error) {
    console.error(
      "STORAGE UPDATE ERROR:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to update storage capacity",
      error: error.message,
    });
  }
});

// ==========================================
// START SERVER
// ==========================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `FrostGuard Backend running on http://localhost:${PORT}`
  );
});