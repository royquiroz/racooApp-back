const express = require("express");
const router = express.Router();
const Company = require("../models/Company");
const auth = require("../helpers/auth");

router.post("/", auth.verifyToken, (req, res) => {
  Company.create(req.body)
    .then(company => {
      res.status(200).json({
        err: false,
        msg: `Compañia creada con exito`
      });
    })
    .catch(err => {
      res.status(500).json({
        err,
        msg: "Error al dar de alta la compañia"
      });
    });
});

router.get("/", auth.verifyToken, (req, res) => {
  Company.find({ isDelete: false })
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
    .populate("clients", "name last_name calls")
    .then(company => {
      res.status(200).json({
        err: false,
        company,
        msg: `Compañia encontrada con exito`
      });
    })
    .catch(err => {
      res.status(500).json({
        err: err,
        msg: "Error al realizar la busqueda de las compañia"
      });
    });
});

module.exports = router;
