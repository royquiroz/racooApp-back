const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sosSchema = new Schema(
  {
    company: String,
    name: {
      type: String,
      required: "El nombre es obligatorio"
    },
    kind: {
      type: String,
      default: "SOS"
    },
    problem: {
      type: String,
      required: "El problema es obligatorio"
    },
    isFinished: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

module.exports = mongoose.model("Sos", sosSchema);
