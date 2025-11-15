const express = require("express");
const router = express.Router();
const hallController = require("../controllers/hallController");

router.get("/", hallController.getAllHalls);
router.get("/venue/:venueId", hallController.getHallsByVenueId);
router.post("/", hallController.createHall);
router.put("/:id", hallController.updateHall);
router.delete("/:id", hallController.deleteHall);

module.exports = router;