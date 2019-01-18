const express = require("express");
const router = express.Router();
const Client = require("../models/Client");
const Company = require("../models/Company");
const auth = require("../helpers/auth");

router.post("/", auth.verifyToken, (req, res) => {
  Client.create(req.body)
    .then(client => {
      Company.findByIdAndUpdate(req.body.companyId, {
        $push: { clients: client._id }
      }).then(() => {
        res.status(200).json({
          err: false,
          msg: `Cliente creado con exito`
        });
      });
    })
    .catch(err => {
      res.status(500).json({
        err,
        msg: "Error al dar de alta el cliente"
      });
    });
});

router.get("/", auth.verifyToken, (req, res) => {
  Client.find({ isDelete: false })
    .populate("company", "kind number name")
    .then(clients => {
      res.status(200).json({
        err: false,
        clients,
        msg: `Clientes encontrados ${clients.length}`
      });
    })
    .catch(err => {
      res.status(500).json({
        err: err,
        msg: "Error al realizar la busqueda de los clientes"
      });
    });
});

router.get("/:id", auth.verifyToken, (req, res) => {
  Client.findById(req.params.id)
    .then(client => {
      res.status(200).json({
        err: false,
        client,
        msg: `Cliente encontrado con exito`
      });
    })
    .catch(err => {
      res.status(500).json({
        err: err,
        msg: "Error al realizar la busqueda de los clientes"
      });
    });
});

module.exports = router;
