const db = require("../db");

// Get all drinks
exports.getAllDrinks = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM drinks");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch drinks", error: error.message });
  }
};

// Add a new drink
exports.createDrink = async (req, res) => {
  const { drinks_name } = req.body;

  if (!drinks_name) {
    return res.status(400).json({ message: "Drinks name is required" });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO drinks (drinks_name) VALUES (?)",
      [drinks_name]
    );
    res.status(201).json({ message: "Drink added", drinks_id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: "Failed to add drink", error: error.message });
  }
};

// Delete a drink
exports.deleteDrink = async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM drinks WHERE drinks_id = ?", [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Drink not found" });
    }
    res.status(200).json({ message: "Drink deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete drink", error: error.message });
  }
};
