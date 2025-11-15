const db = require("../db");

// Get all halls
exports.getAllHalls = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM halls");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch halls", error: error.message });
  }
};

// Get halls by venue ID
exports.getHallsByVenueId = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM halls WHERE venue_id = ?", [req.params.venueId]);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch halls", error: error.message });
  }
};

// Create new hall
exports.createHall = async (req, res) => {
  const { venue_id, hall_name, hall_capacity, hall_photo } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO halls (venue_id, hall_name, hall_capacity, hall_photo) VALUES (?, ?, ?, ?)",
      [venue_id, hall_name, hall_capacity, hall_photo]
    );
    res.status(201).json({ message: "Hall created", hall_id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: "Failed to create hall", error: error.message });
  }
};

// Update hall
exports.updateHall = async (req, res) => {
  const { hall_name, hall_capacity, hall_photo } = req.body;
  try {
    const [result] = await db.query(
      "UPDATE halls SET hall_name = ?, hall_capacity = ?, hall_photo = ? WHERE hall_id = ?",
      [hall_name, hall_capacity, hall_photo, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: "Hall not found" });
    res.status(200).json({ message: "Hall updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update hall", error: error.message });
  }
};

// Delete hall
exports.deleteHall = async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM halls WHERE hall_id = ?", [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Hall not found" });
    res.status(200).json({ message: "Hall deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete hall", error: error.message });
  }
};