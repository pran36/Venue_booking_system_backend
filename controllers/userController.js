const db = require("../db");
const bcrypt = require("bcrypt");

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const [users] = await db.query("SELECT * FROM users");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve users", error: error.message });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const [users] = await db.query("SELECT * FROM users WHERE user_id = ?", [req.params.id]);
    if (users.length === 0) return res.status(404).json({ message: "User not found" });
    res.status(200).json(users[0]);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve user", error: error.message });
  }
};

// Create new user
exports.createUser = async (req, res) => {
  const { user_name, password, role, phone_no, address, email } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      `INSERT INTO users (user_name, password, role, phone_no, address, email)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [user_name, hashedPassword, role || "user", phone_no, address, email]
    );

    res.status(201).json({ message: "User created", user_id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: "Failed to create user", error: error.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM users WHERE user_id = ?", [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user", error: error.message });
  }
};
