const express = require("express");
const router = express.Router();
const Call = require("../models/Call");
const Client = require("../models/Client");
const Company = require("../models/Company");
const auth = require("../helpers/auth");

router.post("/", auth.verifyToken, (req, res) => {
  Call.create(req.body)
    .then(call => {
      Client.findByIdAndUpdate(req.body.client, {
        $push: { calls: call._id }
      }).then(() => {
        Company.findByIdAndUpdate(req.body.company, {
          $push: { calls: call.id }
        }).then(() => {
          res.status(200).json({
            err: false,
            call,
            msg: `Llamada creada con exito`
          });
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
  Call.find({
    created_at: {
      $gte: new Date(req.query.init + "T00:00:00.000Z"),
      $lt: new Date(req.query.fin + "T23:59:59.999Z")
    }
  })
    .populate({
      path: "client",
      select: "name last_name",
      populate: { path: "company", select: "kind lawyer name" }
    })
    .populate("user", "name last_name")
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
    .populate({
      path: "client",
      select: "name last_name",
      populate: { path: "company", select: "kind lawyer name" }
    })
    .populate("user", "name last_name")
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

router.patch("/:id", auth.verifyToken, (req, res) => {
  Call.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }).then(
    call => {
      res
        .status(200)
        .json({
          call,
          msg: `Ubicacion con el id: ${req.params.id} editada`
        })
        .catch(err => {
          res.status(500).json({
            err,
            msg: "Error al editar la llamada"
          });
        });
    }
  );
});

module.exports = router;
