const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sosSchema = new Schema(
  {
    _id: String,
    company: String,
    user: {
      type: String,
      required: "El nombre es obligatorio"
    },
    id_user: String,
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
    _id: false,
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

module.exports = mongoose.model("Sos", sosSchema);
