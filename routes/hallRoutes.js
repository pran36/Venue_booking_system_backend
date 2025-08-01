const express = require("express");
const router = express.Router();
const hallController = require("../controllers/hallController");

router.get("/", hallController.getAllHalls);
router.post("/", hallController.createHall);
router.get("/:id", hallController.getHallById); // 👈 New route

module.exports = router;