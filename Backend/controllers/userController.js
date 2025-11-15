const db = require("../db");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

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

    // Generate a verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // Save user with verification token
    const [result] = await db.query(
      `INSERT INTO users (user_name, password, role, phone_no, address, email, verification_token)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [user_name, hashedPassword, role || "user", phone_no, address, email, verificationToken]
    );

    // Send verification email
    const transporter = nodemailer.createTransport({
      service: "gmail", // or your email provider
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const verificationUrl = `http://yourdomain.com/api/users/verify/${verificationToken}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify your email",
      html: `<p>Hi ${user_name},</p>
             <p>Please verify your email by clicking the link below:</p>
             <a href="${verificationUrl}">${verificationUrl}</a>`,
    });

    res.status(201).json({ message: "User created. Verification email sent.", user_id: result.insertId });
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

// User login
exports.loginUser = async (req, res) => {
  const { user_name, password } = req.body;

  try {
    // Find user by username
    const [users] = await db.query("SELECT * FROM users WHERE user_name = ?", [user_name]);
    if (users.length === 0) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const user = users[0];

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Optional: Check if user is verified (if you have email verification)
    // if (user.verification_token) {
    //   return res.status(403).json({ message: "Please verify your email before logging in." });
    // }

    // Remove sensitive fields from user object
    delete user.password;
    delete user.verification_token;

    // Generate JWT token
    const token = jwt.sign(
      { user_id: user.user_id, user_name: user.user_name, role: user.role },
      process.env.JWT_SECRET || "your_jwt_secret",
      { expiresIn: "7d" }
    );

    res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};
