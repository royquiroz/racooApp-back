const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: "Campo de nombre obligatorio"
    },
    email: {
      type: String,
      unique: true,
      required: "Campo de email obligatorio"
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER"
    },
    img_profile: {
      type: String,
      default:
        "https://res.cloudinary.com/royquiroz/image/upload/v1547066938/male-face01_n03jts.png"
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

module.exports = mongoose.model("User", userSchema);
