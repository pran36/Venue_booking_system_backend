const db = require("../db");

exports.getAllHalls = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM halls");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createHall = async (req, res) => {
  const {
    hall_name,
    hall_location,
    hall_capacity,
    hall_open_time,
    hall_close_time,
    hall_photo,
  } = req.body;

  try {
    const [result] = await db.query(
      `INSERT INTO halls 
       (hall_name, hall_location, hall_capacity, hall_open_time, hall_close_time, hall_photo) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        hall_name,
        hall_location,
        hall_capacity,
        hall_open_time,
        hall_close_time,
        hall_photo,
      ]
    );

    res.status(201).json({ message: "Hall created", id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
