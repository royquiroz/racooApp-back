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
      enum: [
        "PENDING",
        "FINALIZED",
        "PENDING DEVELOPMENT",
        "PENDING SUPPORT",
        "PENDING VISITS",
        "SALES"
      ],
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
      default: 1
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
      ]
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    record: [
      {
        user: {
          type: String
        },
        update: {
          type: Date
        },
        history: {
          type: String
        }
      }
    ],
    client: {
      type: Schema.Types.ObjectId,
      ref: "Client"
    },
    isDelete: {
      type: Boolean,
      default: false
    },
    prev_db_user: String,
    prev_db: {
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
