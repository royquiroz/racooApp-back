const express = require("express");
const router = express.Router();
const Call = require("../models/Call");
const Client = require("../models/Client");
const auth = require("../helpers/auth");

router.post("/", auth.verifyToken, (req, res) => {
  Call.create(req.body)
    .then(call => {
      Client.findByIdAndUpdate(req.body.client, {
        $push: { calls: call._id }
      }).then(() => {
        res.status(200).json({
          err: false,
          msg: `LLamada creada con exito`
        });
      });
    })
    .catch(err => {
      res.status(500).json({
        err,
        msg: "Error al dar de alta la llamada"
      });
    });
});

router.get("/", auth.verifyToken, (req, res) => {
  Call.find({ isDelete: false })
    .then(calls => {
      res.status(200).json({
        err: false,
        calls,
        msg: `Llamadas encontradas ${calls.length}`
      });
    })
    .catch(err => {
      res.status(500).json({
        err: err,
        msg: "Error al realizar la busqueda de las llamadas"
      });
    });
});

router.get("/:id", auth.verifyToken, (req, res) => {
  Call.findById(req.params.id)
    .then(call => {
      res.status(200).json({
        err: false,
        call,
        msg: `Llamada encontrada con exito`
      });
    })
    .catch(err => {
      res.status(500).json({
        err: err,
        msg: "Error al realizar la busqueda de la llamada"
      });
    });
});

module.exports = router;
