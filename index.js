const express = require("express");
const app = express();
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const hallRoutes = require("./routes/hallRoutes");

app.use("/api/halls", hallRoutes);

app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
