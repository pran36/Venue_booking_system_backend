const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

// Routes
router.get("/", bookingController.getAllBookings);
router.get("/:id", bookingController.getBookingById);
router.post("/", bookingController.createBooking);
router.delete("/:id", bookingController.deleteBooking);

module.exports = router;
