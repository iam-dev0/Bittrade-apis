import Card from "../models/card";
import User from "../models/users";
import { Coinbase_API_Key } from "../config/config";
var coinbase = require("coinbase-commerce-node");
var Client = coinbase.Client;
var Charge = coinbase.resources.Charge;
Client.init(Coinbase_API_Key);

const checkout = {};

checkout.createCharge = async (req, res) => {
  const { id } = req.params;
  const { price } = req.query;
  let userData;
  User.findById(id, (err, response) => {
    if (err) {
      res.status(400).json({
        success: false,
        message:
          "Sorry Something Happened We'll get back to you as soon as possible",
        error: err
      });
      return null;
    }
    if (response) {
      userData = response;
      let ChargeObj = createCharge({ userData, price });
      ChargeObj.save((error, response) => {
        if (error) {
          res.status(422).json({
            success: false,
            message:
              "Sorry Something Happened With the Coinbase Server We'll get back to you as soon as possible",
            error: error
          });
          return null;
        }
        if (response && response.id) {
          res.status(200).json({
            success: true,
            message: "",
            hosted_url: response.hosted_url
          });
          return null;
        }
        res.status(422).json({
          success: false,
          message: "Sorry Can't Host the URL Because of An Issue"
        });
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Can't Find the User"
      });
      return null;
    }
  });
};

const createCharge = ({ userData, price }) => {
  return new Charge({
    description: `${userData.email}`,
    metadata: {
      customer_id: "id_1005",
      customer_name: "Name"
    },
    name: "BitTrade",
    payments: [],
    local_price: {
      amount: `${price}`,
      currency: "USD"
    },
    pricing_type: "fixed_price"
  });
};

const LumSumPrice = products => {
  let price = 0;
  products.map(item => {
    price = price + item.product.price * item.product.quantity;
  });
  return price;
};
export default checkout;

/** this ends this file
 * server/controllers/card.controller
 **/
