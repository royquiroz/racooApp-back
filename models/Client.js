const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSchema = new Schema(
  {
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company"
    },
    name: {
      type: String,
      required: "Campo de nombre obligatorio"
    },
    last_name: String,
    telephone: Number,
    extension: Number,
    positions: [String],
    description: String,
    calls: [
      {
        type: Schema.Types.ObjectId,
        ref: "Call"
      }
    ],
    isDelete: {
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

module.exports = mongoose.model("Client", clientSchema);
