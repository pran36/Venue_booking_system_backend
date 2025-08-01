const db = require("../db");

// Get all dinner items
exports.getAllDinners = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM dinners");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch dinners", error: error.message });
  }
};

// Add a new dinner item
exports.createDinner = async (req, res) => {
  const { dinner_name } = req.body;

  if (!dinner_name) {
    return res.status(400).json({ message: "Dinner name is required" });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO dinners (dinner_name) VALUES (?)",
      [dinner_name]
    );
    res.status(201).json({ message: "Dinner item added", dinner_id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: "Failed to add dinner item", error: error.message });
  }
};

// Delete a dinner item
exports.deleteDinner = async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM dinners WHERE dinner_id = ?", [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Dinner item not found" });
    }
    res.status(200).json({ message: "Dinner item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete dinner item", error: error.message });
  }
};
