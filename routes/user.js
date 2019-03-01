const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../helpers/auth");

router.get("/", auth.verifyToken, (req, res) => {
  User.find({}, { name: 1 })
    .then(users => {
      res.status(200).json({
        err: false,
        users,
        msg: `Usuarios encontrados ${users.length}`
      });
    })
    .catch(err => {
      res.status(500).json({
        err: err,
        msg: "Error al realizar la busqueda de todos los usuarios"
      });
    });
});

router.patch("/:id", auth.verifyToken, (req, res) => {
  if (req.body.password) {
    const salt = bcrypt.genSaltSync(256);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    req.body.password = hashedPassword;
  }
  if (req.file) {
    req.body.profile_pic = req.file.url;
  }

  User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then(user => {
      res.status(202).json({
        user,
        msg: "Datos actualizados correctamente"
      });
    })
    .catch(err => {
      res.status(500).json({
        err,
        msg: "No se pudo actualizar el usuario"
      });
    });
});

module.exports = router;
