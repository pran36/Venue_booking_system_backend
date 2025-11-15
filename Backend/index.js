const express = require("express");
const app = express();
const cors = require("cors")
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const venueRoutes = require("./routes/venueRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const snacksRoutes = require("./routes/snacksRoutes");
const dinnerRoutes = require("./routes/dinnerRoutes");
const addonRoutes = require("./routes/addonRoutes");
const drinksRoutes = require("./routes/drinksRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const hallRoutes = require("./routes/hallRoutes");

app.use(express.json());
app.use(cors());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/venue", venueRoutes);
app.use("/api/snacks", snacksRoutes);
app.use("/api/dinners", dinnerRoutes);
app.use("/api/addons", addonRoutes);
app.use("/api/drinks", drinksRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/halls", hallRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
