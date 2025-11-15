const db = require("./db");

async function createVenueTable() {
  const sql = `
    CREATE TABLE IF NOT EXISTS venues (
      venue_id INT AUTO_INCREMENT PRIMARY KEY,
      venue_name VARCHAR(100) NOT NULL,
      venue_address TEXT NOT NULL,
      venue_desc TEXT,
      venue_photo VARCHAR(255),
      venue_price DECIMAL(10, 2),
      venue_open_time TIME,
      venue_close_time TIME,
      parking_capacity INT,
      venue_capacity INT
    )
  `;

  try {
    await db.query(sql);
    console.log("'venues' table created or updated successfully.");
  } catch (err) {
    console.error("Error creating 'venues' table:", err.message);
  }
}

async function createUserTable() {
  const user = `
    CREATE TABLE IF NOT EXISTS users (
      user_id INT AUTO_INCREMENT PRIMARY KEY,
      user_name VARCHAR(100) NOT NULL,
      password VARCHAR(255) NOT NULL,
      role ENUM('admin', 'user') DEFAULT 'user',
      phone_no VARCHAR(20),
      address VARCHAR(255),
      email VARCHAR(100) UNIQUE
    )
  `;

  try {
    await db.query(user);
    await db.query('ALTER TABLE users ADD COLUMN IF NOT EXISTS verification_token VARCHAR(64)');
    console.log("✅ 'Users' table created/updated successfully.");
  } catch (err) {
    console.error("❌ Error creating 'Users' table:", err.message);
  }
}

createUserTable();

createVenueTable();

async function createBookingTable() {
  const sql = `
    CREATE TABLE IF NOT EXISTS bookings (
      booking_id INT AUTO_INCREMENT PRIMARY KEY,
      venue_id INT,
      venue_name VARCHAR(100),
      booked_date DATE,
      snacks_packages TEXT,
      dinner_packages TEXT,
      drinks_packages TEXT,
      guest_count INT,
      addon_services TEXT,
      estimated_cost DECIMAL(10, 2),
      event_name VARCHAR(100),
      booked_user VARCHAR(100),
      user_id INT,
      user_phone VARCHAR(20),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (venue_id) REFERENCES venues(venue_id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL
    )
  `;

  try {
    await db.query(sql);
    console.log("✅ 'bookings' table created/updated successfully.");
  } catch (err) {
    console.error("❌ Error creating 'bookings' table:", err.message);
  }
}

createBookingTable();

async function createSnacksTable() {
  const snacks = `
    CREATE TABLE IF NOT EXISTS snacks (
  snacks_id INT AUTO_INCREMENT PRIMARY KEY,
  snacks_name VARCHAR(100) NOT NULL
)
  `;

  try {
    await db.query(snacks);
    console.log("✅ 'snacks' table created/updated successfully.");
  } catch (err) {
    console.error("❌ Error creating 'snacks' table:", err.message);
  }
}

createSnacksTable();

async function createDinnerTable() {
  const dinner = `
    CREATE TABLE IF NOT EXISTS dinners (
  dinner_id INT AUTO_INCREMENT PRIMARY KEY,
  dinner_name VARCHAR(100) NOT NULL
)
  `;

  try {
    await db.query(dinner);
    console.log("✅ 'snacks' table created/updated successfully.");
  } catch (err) {
    console.error("❌ Error creating 'snacks' table:", err.message);
  }
}

createDinnerTable();

async function createAddonsTable() {
  const addons = `
    CREATE TABLE IF NOT EXISTS addons (
  addon_id INT AUTO_INCREMENT PRIMARY KEY,
  addon_name VARCHAR(100) NOT NULL,
  addon_desc TEXT
)
  `;

  try {
    await db.query(addons);
    console.log("✅ 'snacks' table created/updated successfully.");
  } catch (err) {
    console.error("❌ Error creating 'snacks' table:", err.message);
  }
}

createAddonsTable();

async function createDrinksTable() {
  const drinks = `
    CREATE TABLE IF NOT EXISTS drinks (
  drinks_id INT AUTO_INCREMENT PRIMARY KEY,
  drinks_name VARCHAR(100) NOT NULL
)
  `;

  try {
    await db.query(drinks);
    console.log("✅ 'snacks' table created/updated successfully.");
  } catch (err) {
    console.error("❌ Error creating 'snacks' table:", err.message);
  }
}

createDrinksTable();

async function createPaymentsTable() {
  const payment = `
    CREATE TABLE IF NOT EXISTS payments (
      payment_id INT AUTO_INCREMENT PRIMARY KEY,
      payment_name VARCHAR(100) NOT NULL,
      user_name VARCHAR(100) NOT NULL,
      amount DECIMAL(10, 2) NOT NULL,
      gateway VARCHAR(100) NOT NULL,
      success BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  try {
    await db.query(payment);
    console.log("✅ 'payments' table created/updated successfully.");
  } catch (err) {
    console.error("❌ Error creating 'payments' table:", err.message);
  }
}

createPaymentsTable();

async function createHallsTable() {
  const createHallsTableSQL = `
    CREATE TABLE IF NOT EXISTS halls (
      hall_id INT AUTO_INCREMENT PRIMARY KEY,
      venue_id INT NOT NULL,
      hall_name VARCHAR(255) NOT NULL,
      hall_capacity INT NOT NULL,
      hall_photo VARCHAR(255),
      FOREIGN KEY (venue_id) REFERENCES venues(venue_id) ON DELETE CASCADE
    )
  `;
  try {
    await db.query(createHallsTableSQL);
    console.log("✅ 'halls' table created/updated successfully.");
  } catch (err) {
    console.error("❌ Error creating 'halls' table:", err.message);
  }
}

createHallsTable();