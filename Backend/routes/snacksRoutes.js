const express = require("express");
const router = express.Router();
const snacksController = require("../controllers/snacksController");

router.get("/", snacksController.getAllSnacks);
router.post("/", snacksController.createSnack);
router.delete("/:id", snacksController.deleteSnack);

module.exports = router;
