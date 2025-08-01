const express = require("express");
const router = express.Router();
const addonController = require("../controllers/addonController");

router.get("/", addonController.getAllAddons);
router.post("/", addonController.createAddon);
router.delete("/:id", addonController.deleteAddon);

module.exports = router;
