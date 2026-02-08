const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Ensure this filename is exactly "taskroutes.js" (all lowercase) in your routes folder
const taskRoutes = require("./routes/taskroutes");

const app = express();

/* 🛠️ MIDDLEWARES */
app.use(cors()); 
app.use(express.json()); // Essential for receiving data from Frontend

/* 🚀 HEALTH CHECK ROUTE */
app.get("/", (req, res) => {
  res.send("Smart Task Manager API running 🚀");
});

/* 🛣️ ROUTES */
app.use("/api/tasks", taskRoutes);

/* 🔌 PORT CONFIGURATION */
// We use 5000 as the primary because your .env uses 5000. 
const PORT = process.env.PORT || 5001;

/* 💾 DATABASE CONNECTION & SERVER START */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected ✅");
    // Start server ONLY after DB connects
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} 🚀`);
    });
  })
  .catch((err) => {
    console.error("MongoDB Connection Error: ❌", err.message);
    process.exit(1); // Stop the server if DB fails
  });