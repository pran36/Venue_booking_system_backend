const db = require("../db");

// Get all addons
exports.getAllAddons = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM addons");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch addons", error: error.message });
  }
};

// Add a new addon
exports.createAddon = async (req, res) => {
  const { addon_name, addon_desc } = req.body;

  if (!addon_name) {
    return res.status(400).json({ message: "Addon name is required" });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO addons (addon_name, addon_desc) VALUES (?, ?)",
      [addon_name, addon_desc]
    );
    res.status(201).json({ message: "Addon created", addon_id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: "Failed to create addon", error: error.message });
  }
};

// Delete an addon
exports.deleteAddon = async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM addons WHERE addon_id = ?", [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Addon not found" });
    }
    res.status(200).json({ message: "Addon deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete addon", error: error.message });
  }
};
