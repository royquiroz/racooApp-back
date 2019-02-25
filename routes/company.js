const express = require("express");
const router = express.Router();
const Company = require("../models/Company");
const auth = require("../helpers/auth");

router.post("/", auth.verifyToken, (req, res) => {
  Company.create(req.body)
    .then(company => {
      res.status(200).json({
        err: false,
        company,
        msg: `Compañia creada con exito`
      });
    })
    .catch(err => {
      console.log(err);

      res.status(500).json({
        err,
        msg: "Error al dar de alta la compañia"
      });
    });
});

router.get("/", auth.verifyToken, (req, res) => {
  var regexp = new RegExp(req.query.name, "i");

  Company.find({
    $or: [{ name: regexp }, { lawyer: regexp }, { key: regexp }],
    isDelete: false
  })
    .populate("clients", "name last_name")
    .then(companies => {
      res.status(200).json({
        err: false,
        companies,
        msg: `Compañias encontradas ${companies.length}`
      });
    })
    .catch(err => {
      res.status(500).json({
        err: err,
        msg: "Error al realizar la busqueda de las compañias"
      });
    });
});

router.get("/all", auth.verifyToken, (req, res) => {
  Company.find({}, { kind: 1, name: 1, lawyer: 1, number: 1, key: 1 })
    .then(companies => {
      res.status(200).json({
        err: false,
        companies,
        msg: `Compañias encontradas ${companies.length}`
      });
    })
    .catch(err => {
      res.status(500).json({
        err: err,
        msg: "Error al realizar la busqueda de las compañias"
      });
    });
});

router.get("/:id", auth.verifyToken, (req, res) => {
  Company.findById(req.params.id)
    .populate({ path: "calls", populate: { path: "user" } })
    .populate({ path: "calls", populate: { path: "client" } })
    .populate("clients", "name last_name calls")
    .then(company => {
      res.status(200).json({
        err: false,
        company,
        msg: `Compañia encontrada con exito`
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        err: err,
        msg: "Error al realizar la busqueda de las compañia"
      });
    });
});

router.patch("/:id", auth.verifyToken, (req, res) => {
  Company.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  ).then(company => {
    res
      .status(200)
      .json({
        company,
        msg: `Compañia editada exitosamente`
      })
      .catch(err => {
        res.status(500).json({
          err,
          msg: "Error al editar la compañia"
        });
      });
  });
});

module.exports = router;
