const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema(
    {
        task: { type: mongoose.Schema.Types.ObjectId, ref: "Task", required: true },
        date: { type: Date, required: true },
        workDescription: { type: String, required: true },
        materialUsed: [
          {
            materialName: String,
            quantity: Number,
            unit: String,
          }
        ],
        labor: {
          skilled: { type: Number, default: 0 },
          unskilled: { type: Number, default: 0 },
          supervisor: { type: Number, default: 0 },
        },
        remarks: { type: String },
        status: {
          type: String,
          enum: ["ongoing", "paused", "completed"],
          default: "ongoing"
        }
      },
      { timestamps: true }
    );

module.exports = mongoose.model("Progress", progressSchema);
