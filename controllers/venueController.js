const db = require("../db");

// Get all venues with their halls
exports.getAllVenues = async (req, res) => {
  try {
    const [venues] = await db.query("SELECT * FROM venues");
    const [halls] = await db.query("SELECT * FROM halls");

    // Attach halls to their respective venues
    const venuesWithHalls = venues.map(venue => ({
      ...venue,
      halls: halls.filter(hall => hall.venue_id === venue.venue_id)
    }));

    res.status(200).json(venuesWithHalls);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch venues", error: error.message });
  }
};

// Get venue by ID with its halls
exports.getVenueById = async (req, res) => {
  try {
    const [venues] = await db.query("SELECT * FROM venues WHERE venue_id = ?", [req.params.id]);
    if (venues.length === 0) return res.status(404).json({ message: "Venue not found" });

    const [halls] = await db.query("SELECT * FROM halls WHERE venue_id = ?", [req.params.id]);
    const venue = { ...venues[0], halls };

    res.status(200).json(venue);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch venue", error: error.message });
  }
};

// Create new venue
exports.createVenue = async (req, res) => {
  const {
    venue_name,
    venue_address,
    venue_desc,
    venue_photo,
    venue_price,
    venue_open_time,
    venue_close_time,
    parking_capacity,
    venue_capacity
  } = req.body;

  try {
    const [result] = await db.query(
      `INSERT INTO venues (
        venue_name, venue_address, venue_desc, venue_photo,
        venue_price, venue_open_time, venue_close_time,
        parking_capacity, venue_capacity
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        venue_name,
        venue_address,
        venue_desc,
        venue_photo,
        venue_price,
        venue_open_time,
        venue_close_time,
        parking_capacity,
        venue_capacity
      ]
    );

    res.status(201).json({ message: "Venue created", venue_id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: "Failed to create venue", error: error.message });
  }
};

// Update venue
exports.updateVenue = async (req, res) => {
  const {
    venue_name,
    venue_address,
    venue_desc,
    venue_photo,
    venue_price,
    venue_open_time,
    venue_close_time,
    parking_capacity,
    venue_capacity
  } = req.body;

  try {
    const [result] = await db.query(
      `UPDATE venues SET
        venue_name = ?, venue_address = ?, venue_desc = ?, venue_photo = ?,
        venue_price = ?, venue_open_time = ?, venue_close_time = ?,
        parking_capacity = ?, venue_capacity = ?
      WHERE venue_id = ?`,
      [
        venue_name,
        venue_address,
        venue_desc,
        venue_photo,
        venue_price,
        venue_open_time,
        venue_close_time,
        parking_capacity,
        venue_capacity,
        req.params.id
      ]
    );

    if (result.affectedRows === 0) return res.status(404).json({ message: "Venue not found" });

    res.status(200).json({ message: "Venue updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update venue", error: error.message });
  }
};

// Delete venue
exports.deleteVenue = async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM venues WHERE venue_id = ?", [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Venue not found" });
    res.status(200).json({ message: "Venue deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete venue", error: error.message });
  }
};
