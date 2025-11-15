const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);
router.post("/login", userController.loginUser);
router.delete("/:id", userController.deleteUser);
router.get("/protected", auth, (req, res) => {
  res.json({ message: "You are authenticated!", user: req.user });
});

module.exports = router;
