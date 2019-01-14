const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companySchema = new Schema(
  {
    kind: {
      type: String,
      enum: ["NOTARY", "COMPANY"],
      default: "NOTARY"
    },
    name: {
      type: String,
      unique: true
    },
    number: Number,
    lawyer: {
      type: String,
      unique: true
    },
    state: Number,
    image: String,
    clients: [
      {
        type: Schema.Types.ObjectId,
        ref: "Client"
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

module.exports = mongoose.model("Company", companySchema);
