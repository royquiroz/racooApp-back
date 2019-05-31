const express = require("express");
const router = express.Router();
const Client = require("../models/Client");
const Company = require("../models/Company");
const auth = require("../helpers/auth");

router.post("/", auth.verifyToken, (req, res) => {
  Client.create(req.body)
    .then(client => {
      Company.findByIdAndUpdate(req.body.company, {
        $push: { clients: client._id }
      }).then(() => {
        res.status(200).json({
          err: false,
          client,
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
  let query = {};
  req.query.name === ""
    ? (query = { isDelete: false })
    : { name: regexp, isDelete: false };
  var regexp = new RegExp(req.query.name, "i");
  Client.find(query, { name: 1, company: 1 })
    .populate("company", "kind number name key")
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
    .populate("company", "kind name number")
    .populate({ path: "calls", populate: { path: "user" } })
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

router.patch("/:id", auth.verifyToken, (req, res) => {
  Client.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  ).then(client => {
    res
      .status(200)
      .json({
        client,
        msg: `Cliente editado exitosamente`
      })
      .catch(err => {
        res.status(500).json({
          err,
          msg: "Error al editar el cliente"
        });
      });
  });
});

module.exports = router;
