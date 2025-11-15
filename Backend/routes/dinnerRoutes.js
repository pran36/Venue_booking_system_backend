const express = require("express");
const router = express.Router();
const dinnerController = require("../controllers/dinnerController");

router.get("/", dinnerController.getAllDinners);
router.post("/", dinnerController.createDinner);
router.delete("/:id", dinnerController.deleteDinner);

module.exports = router;
