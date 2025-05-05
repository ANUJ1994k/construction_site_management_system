const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema(
  {
    site: { type: mongoose.Schema.Types.ObjectId, ref: "Site", required: true },
    materialName: { type: String, required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, default: "kg" }, // or m³, tons, etc.
    dateReceived: { type: Date, required: true },
    receivedBy: { type: String }, // name of person receiving
    remarks: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Material", materialSchema);
