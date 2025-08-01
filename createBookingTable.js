const db = require("./db");

async function createBookingTable() {
  const sql = `
    CREATE TABLE IF NOT EXISTS hall_bookings (
      booking_id INT AUTO_INCREMENT PRIMARY KEY,
      hall_id INT,
      hall_name VARCHAR(100),
      booked_date DATE,
      food_packages TEXT,
      guest_count INT,
      addon_services TEXT,
      estimated_cost DECIMAL(10, 2),
      booked_user VARCHAR(100),
      user_phone VARCHAR(20),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (hall_id) REFERENCES halls(hall_id) ON DELETE CASCADE
    )
  `;

  try {
    await db.query(sql);
    console.log("✅ 'hall_bookings' table created.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error creating 'hall_bookings' table:", err.message);
    process.exit(1);
  }
}

createBookingTable();
