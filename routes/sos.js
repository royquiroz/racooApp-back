const express = require("express");
const router = express.Router();
const Sos = require("../models/Sos");
const auth = require("../helpers/auth");

router.post("/", (req, res) => {
  Sos.create(req.body)
    .then(() => {
      res.status(200).json({
        err: false,
        sos: req.body,
        msg: `SOS se recibio y se creo exitosamente`
      });
    })
    .catch(err => {
      res.status(500).json({
        err,
        msg: "Error al dar de alta el sos"
      });
    });
});

router.get("/", auth.verifyToken, (req, res) => {
  Sos.find({ isFinished: false })
    .then(sos => {
      res.status(200).json({
        err: false,
        sos
      });
    })
    .catch(err => {
      res.status(500).json({
        err,
        msg: "No se pudo conectar a la BD"
      });
    });
});

router.get("/:id", auth.verifyToken, (req, res) => {
  Sos.findById(req.params.id)
    .then(sos => {
      res.status(200).json({
        err: false,
        sos,
        msg: `Sos encontrado con exito`
      });
    })
    .catch(err => {
      res.status(500).json({
        err: err,
        msg: "Error al realizar la busqueda del sos"
      });
    });
});

router.patch("/:id", auth.verifyToken, (req, res) => {
  Sos.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }).then(
    sos => {
      res
        .status(200)
        .json({
          sos,
          msg: `Sos editado exitosamente`
        })
        .catch(err => {
          res.status(500).json({
            err,
            msg: "Error al editar el sos"
          });
        });
    }
  );
});

module.exports = router;
