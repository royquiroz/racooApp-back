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
      index: true,
      unique: true,
      sparse: true
    },
    number: Number,
    lawyer: {
      type: String,
      index: true,
      unique: true,
      sparse: true
    },
    state: Number,
    telephone: Number,
    image: String,
    clients: [
      {
        type: Schema.Types.ObjectId,
        ref: "Client"
      }
    ],
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

module.exports = mongoose.model("Company", companySchema);
