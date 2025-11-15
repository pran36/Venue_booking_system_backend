const express = require("express");
const router = express.Router();
const drinksController = require("../controllers/drinksController");

router.get("/", drinksController.getAllDrinks);
router.post("/", drinksController.createDrink);
router.delete("/:id", drinksController.deleteDrink);

module.exports = router;
