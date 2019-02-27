const express = require("express");
const router = express.Router();
const Call = require("../models/Call");
const Comment = require("../models/Comment");
const auth = require("../helpers/auth");

router.post("/", auth.verifyToken, (req, res) => {
  Comment.create(req.body)
    .then(comment => {
      Call.findByIdAndUpdate(req.body.call, {
        $push: { comments: comment._id }
      }).then(() => {
        res.status(200).json({
          err: false,
          comment,
          msg: `Comentario creado exitosamente`
        });
      });
    })
    .catch(err => {
      res.status(500).json({
        err,
        msg: "Error al dar de alta el comentario"
      });
    });
});

module.exports = router;
