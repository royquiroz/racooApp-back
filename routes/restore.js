const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.post("/search", async (req, res) => {
  console.log(req.body);

  const user = await User.findOne({ email: req.body.email });

  if (!user)
    return res
      .status(404)
      .json({ msg: "Usuario no existente en la base de datos" });

  delete user._doc.password;
  res.status(200).json({ user });
});

router.post("/change", (req, res) => {
  const salt = bcrypt.genSaltSync(256);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);

  req.body.password = hashedPassword;
  console.log(req.body);

  User.findOneAndUpdate(
    { email: req.body.email },
    { $set: req.body },
    { new: true }
  )
    .then(user => {
      delete user._doc.password;
      res.status(202).json({
        user,
        msg: "Contraseña actualizada correctamente"
      });
    })
    .catch(err => {
      res.status(500).json({
        err,
        msg: "No se pudo actualizar la contraseña"
      });
    });
});

module.exports = router;
