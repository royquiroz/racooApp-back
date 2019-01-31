const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const callSchema = new Schema(
  {
    problem: {
      type: String,
      required: "El campo del problema es obligatorio"
    },
    solution: {
      type: String
    },
    status: {
      type: String,
      enum: ["PENDING", "FINALIZED"],
      default: "PENDING"
    },
    kind: {
      type: String,
      enum: ["CALL", "SOS", "REVERSE"],
      default: "CALL"
    },
    ending: {
      type: String,
      enum: ["PRODUCTIVE", "UNPRODUCTIVE"]
    },
    classification: {
      type: Number,
      min: 1,
      max: 3,
      default: 0
    },
    system: {
      type: String,
      enum: [
        "MINOTARIA",
        "CALCULOFACIL",
        "LISTASPB",
        "CFDI",
        "UIF",
        "RACOO NOTARIOS"
      ],
      default: "MINOTARIA"
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: "Client"
    },
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

module.exports = mongoose.model("Call", callSchema);
