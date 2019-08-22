"use strict";

var _card = require("../models/card");

var _card2 = _interopRequireDefault(_card);

var _products = require("../models/products");

var _products2 = _interopRequireDefault(_products);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cardController = {};

cardController.addToCard = async function (req, res, next) {
  try {
    var errors = myValidationResult(req).array(); // Finds the validation errors in this request and wraps them in an object with handy functions

    if (errors.length > 0) {
      res.status(422).json({ errors: errors });
      return;
    }

    var _req$body = req.body,
        userId = _req$body.userId,
        productid = _req$body.productid;


    _products2.default.findOne({ productid: productid }, async function (err, data) {
      if (err) {
        res.status(422).json({ errors: res });
        return;
      }
      if (data) {
        var _Card = new _Card({ userId: userId, product: data });

        await _Card.save(function (err) {
          if (err) {
            res.status(400).json({ error: err });
          } else {
            res.status(200).json({ status: "200", favoriteproduct: favoriteproduct });
          }
        });
      } else {
        res.status(400).json({ success: false, message: "This product doesn't exsist" });
      }
    });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

cardController.getCard = async function (req, res, next) {

  var id = req.params.id;

  favoriteProduct.find({ userId: id }, function (err, data) {
    if (err) {
      res.status(422).json({ errors: res });
      return;
    }
    if (data) {
      res.status(200).json({ success: true, message: "There is the list of your Products in card", product: data });
    } else {
      res.status(400).json({ success: false, message: "Sorry your card is empty" });
    }
  });
};
cardController.removeCardProduct = async function (req, res) {
  var _req$query = req.query,
      productid = _req$query.productid,
      userId = _req$query.userId;

  _products2.default.remove({ _id: userId, product: { _id: productid } }, function (err, obj) {
    if (err) res.status(400).json({ error: err });
    console.log(obj.result.n + " document(s) deleted");
  });
};

module.exports = cardController;

/** this ends this file
* server/controllers/card.controller
**/
//# sourceMappingURL=card.controller.js.map