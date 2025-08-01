const db = require("./db");

async function createHallsTable() {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS halls (
      hall_id INT AUTO_INCREMENT PRIMARY KEY,
      hall_name VARCHAR(100) NOT NULL,
      hall_location VARCHAR(255),
      hall_capacity INT,
      hall_open_time TIME,
      hall_close_time TIME,
      hall_photo VARCHAR(255)
    )
  `;

  try {
    await db.query(createTableSQL);
    console.log("✅ 'halls' table created (if not exists).");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error creating table:", err.message);
    process.exit(1);
  }
}

createHallsTable();
