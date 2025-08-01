const db = require("../db");

exports.createBooking = async (req, res) => {
  const {
    hall_id,
    hall_name,
    booked_date,
    food_packages,
    guest_count,
    addon_services,
    estimated_cost,
    booked_user,
    user_phone,
  } = req.body;

  try {
    const [result] = await db.query(
      `INSERT INTO hall_bookings 
      (hall_id, hall_name, booked_date, food_packages, guest_count, addon_services, estimated_cost, booked_user, user_phone)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        hall_id,
        hall_name,
        booked_date,
        food_packages,
        guest_count,
        addon_services,
        estimated_cost,
        booked_user,
        user_phone,
      ]
    );

    res.status(201).json({ message: "Booking created", booking_id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Hello");
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM hall_bookings ORDER BY booked_date DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
