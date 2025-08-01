const db = require("../db");

// Get all payments
exports.getAllPayments = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM payments ORDER BY created_at DESC");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch payments", error: error.message });
  }
};

// Get payment by ID
exports.getPaymentById = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM payments WHERE payment_id = ?", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: "Payment not found" });
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch payment", error: error.message });
  }
};

// Create payment
exports.createPayment = async (req, res) => {
  const { payment_name, user_name, amount, gateway, success } = req.body;

  try {
    const [result] = await db.query(
      `INSERT INTO payments (payment_name, user_name, amount, gateway, success)
       VALUES (?, ?, ?, ?, ?)`,
      [payment_name, user_name, amount, gateway, success || false]
    );
    res.status(201).json({ message: "Payment created", payment_id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: "Failed to create payment", error: error.message });
  }
};

// Delete payment
exports.deletePayment = async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM payments WHERE payment_id = ?", [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Payment not found" });
    res.status(200).json({ message: "Payment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete payment", error: error.message });
  }
};
