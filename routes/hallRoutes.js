const express = require("express");
const router = express.Router();
const hallController = require("../controllers/hallController");

router.get("/", hallController.getAllHalls);
router.post("/", hallController.createHall);

module.exports = router;