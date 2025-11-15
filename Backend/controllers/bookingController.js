const db = require("../db");

// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM bookings ORDER BY created_at DESC");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings", error: error.message });
  }
};

// Get booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM bookings WHERE booking_id = ?", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch booking", error: error.message });
  }
};

// Create a new booking
exports.createBooking = async (req, res) => {
  const {
    venue_id,
    venue_name,
    booked_date,
    snacks_packages,
    dinner_packages,
    drinks_packages,
    guest_count,
    addon_services,
    estimated_cost,
    event_name,
    booked_user,
    user_id,
    user_phone
  } = req.body;

  try {
    const [result] = await db.query(
      `INSERT INTO bookings (
        venue_id, venue_name, booked_date, snacks_packages,
        dinner_packages, drinks_packages, guest_count, addon_services,
        estimated_cost, event_name, booked_user, user_id, user_phone
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        venue_id,
        venue_name,
        booked_date,
        snacks_packages,
        dinner_packages,
        drinks_packages,
        guest_count,
        addon_services,
        estimated_cost,
        event_name,
        booked_user,
        user_id,
        user_phone
      ]
    );

    res.status(201).json({ message: "Booking created", booking_id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: "Failed to create booking", error: error.message });
  }
};

// Delete a booking
exports.deleteBooking = async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM bookings WHERE booking_id = ?", [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete booking", error: error.message });
  }
};
