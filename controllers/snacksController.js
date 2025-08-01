const db = require("../db");

// Get all snacks
exports.getAllSnacks = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM snacks");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch snacks", error: error.message });
  }
};

// Add a new snack
exports.createSnack = async (req, res) => {
  const { snacks_name } = req.body;

  if (!snacks_name) {
    return res.status(400).json({ message: "Snacks name is required" });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO snacks (snacks_name) VALUES (?)",
      [snacks_name]
    );
    res.status(201).json({ message: "Snack added", snacks_id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: "Failed to add snack", error: error.message });
  }
};

// Delete a snack
exports.deleteSnack = async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM snacks WHERE snacks_id = ?", [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Snack not found" });
    }
    res.status(200).json({ message: "Snack deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete snack", error: error.message });
  }
};
