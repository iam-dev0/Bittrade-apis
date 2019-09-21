import Card from "../models/card";
import Product from "../models/products";
import { Coinbase_API_Key } from "../config/config";
var coinbase = require("coinbase-commerce-node");
var Client = coinbase.Client;
var Charge = coinbase.resources.Charge;
Client.init(Coinbase_API_Key);

const checkout = {};

checkout.createCharge = async (req, res) => {
  var firstChargeObj = new Charge({
    description: "Mastering the Transition to the Information Age",
    metadata: {
      customer_id: "id_1005",
      customer_name: "Satoshi Nakamoto"
    },
    name: "Test Name",
    payments: [],
    pricing_type: "no_price"
  });
  firstChargeObj.save(function(error, response) {
    console.log("Created charge(callback)");
    console.log(response);
    console.log(error);

    if (response && response.id) {
      Charge.retrieve(response.id, function(error, response) {
        console.log("Retrived charge(callback)");
        console.log(response);
        console.log(error);
        res.status(200).json({
          success: true,
          message:
            "",
            hosted_url: response.hosted_url
        });
        return;
      });
    }
  });
};

export default checkout;

/** this ends this file
 * server/controllers/card.controller
 **/
