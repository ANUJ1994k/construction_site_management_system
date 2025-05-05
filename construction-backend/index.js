const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const siteRoutes = require("./routes/siteRoutes");
const taskRoutes = require("./routes/taskRoutes");
const materialRoutes = require("./routes/materialRoutes");
const progressRoutes = require("./routes/progressRoutes");
const cors=require("cors")
dotenv.config();
const app = express();
connectDB();

app.use(express.json());

//cors origin
app.use(cors());
// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// TODO: Add routes 

app.use("/api/sites", siteRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/materials", materialRoutes);
app.use("/api/progress", progressRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
