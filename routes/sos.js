const express = require("express");
const router = express.Router();
const Sos = require("../models/Sos");

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

router.get("/", (req, res) => {
  Sos.find()
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

module.exports = router;
