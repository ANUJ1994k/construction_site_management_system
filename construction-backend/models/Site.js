const mongoose = require("mongoose");

const siteSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Site", siteSchema);
