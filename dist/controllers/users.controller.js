"use strict";

var _util = require("../utils/util");

var UsersController = {};
var User = require("../models/users");

UsersController.getUsers = async function (req, res) {
  var User = await User.find();

  res.json(User);
};

UsersController.createUser = async function (req, res) {
  try {
    var errors = (0, _util.myValidationResult)(req).array(); // Finds the validation errors in this request and wraps them in an object with handy functions
    if (errors.length > 0) {
      res.status(422).json({ errors: errors });
      return;
    }
    var _req$body = req.body,
        name = _req$body.name,
        email = _req$body.email,
        password = _req$body.password;


    User.findOne({ email: email }, function (err, data) {
      if (err) {
        res.status(422).json({ errors: err });
        return;
      }
      if (!data) {
        var user = new User({ name: name, email: email, password: password });

        user.save(function (err) {
          if (err) {
            res.json({ error: err });
          } else {
            res.send({
              Success: "You are regestered,Please Confrim you email"
            });
          }
        });
      } else {
        res.send({ Success: "Email is already used." });
      }
    });
  } catch (err) {
    res.json({ error: err });
  }
};

UsersController.Login = async function (req, res) {
  var errors = (0, _util.myValidationResult)(req).array(); // Finds the validation errors in this request and wraps them in an object with handy functions
  if (errors.length > 0) {
    res.status(422).json({ errors: errors });
    return;
  }
  var _req$body2 = req.body,
      email = _req$body2.email,
      password = _req$body2.password;

  User.findOne({ email: email }, function (err, data) {
    if (err) {
      res.status(422).json({ errors: res });
      return;
    }
    if (data) {
      if (data.password === password) {
        //console.log("Done Login");
        //req.session.userId = data.unique_id;
        //console.log(req.session.userId);
        res.status(200).json({ success: true, message: "Successfully login", name: data.name, email: data.email });
      } else {
        res.status(400).json({ success: false, message: "login fail" });
      }
    } else {
      res.status(400).json({ success: false, message: "This Email Is not regestered!" });
    }
  });
};

UsersController.editUsersimpleData = async function (req, res) {
  var id = req.params.id;


  var Usere = await Users.findById(id);

  Usere.first_name = req.body.first_name;
  Usere.last_name = req.body.last_name;
  Usere.nick_name = req.body.nick_name;
  Usere.tax_id.tax_type = req.body.tax_id.tax_type;
  Usere.tax_id.tax_code = req.body.tax_id.tax_code;
  Usere.emails = Usere.emails;
  Usere.addresses = Usere.addresses;
  Usere.phones = Usere.phones;

  await Usere.save().then(function () {
    res.json({ status: "200" });
  });
};

UsersController.editEmailsData = async function (req, res) {
  /*
        model for req: 
            {
                "verified": false,
                "email": "correo@pedroruizhidalgo.es"
            }
    */
  var id = req.params.id;
  var email = req.params.email;


  await Users.findOneAndUpdate({ _id: id, "emails._id": email }, {
    $set: {
      "emails.$": req.body
    }
  }).then(function (doc) {
    res.json({ status: "200" });
  }).catch(function (e) {
    console.log(e);
  });
};

UsersController.editAddressData = async function (req, res) {
  /*
        model for req: 
        {
            "contact": "contact", no required
            "street": "street", required
            "city": "city", required
            "province": "province", required
            "zip": "zip", required
        }
    */

  var id = req.params.id;
  var address = req.params.address;


  await Users.findOneAndUpdate({ _id: id, "addresses._id": address }, { $set: { "addresses.$": req.body } }).then(function (doc) {
    res.json({ status: "200" });
  }).catch(function (e) {
    console.log(e);
  });
};

UsersController.editPhonesData = async function (req, res) {
  /*
        model for phones
    {
        phoneType: { type: String, required: false },
        prefix: { type: String, required: false},
        number: { type: String, required: true },
        subfix: { type: String, requied: false},
        memo: { type: String, required: false, description: "use if you need other data" },
         required: false
    }
    */

  var id = req.params.id;
  var phone = req.params.phone;


  await Users.findOneAndUpdate({ _id: id, "phones._id": phone }, { $set: { "phones.$": req.body } }).then(function (doc) {
    res.json({ status: "200" });
  }).catch(function (e) {
    console.log(e);
  });
};

UsersController.pushEmails = async function (req, res) {
  var newEmails = req.body;
  var id = req.params.id;


  await Users.findById(id).then(function (User) {
    User.emails.push(newEmails);
    User.save();
  }).catch(function (e) {
    console.log(e);
  }).then(res.json({ status: "200" }));
};

UsersController.pushAddresses = async function (req, res) {
  var newAddresses = req.body;
  var id = req.params.id;


  await Users.findById(id).then(function (User) {
    User.addresses.push(newAddresses);
    User.save();
  }).catch(function (e) {
    return console.log(e);
  }).then(res.json({ status: "200" }));
};

UsersController.pushPhones = async function (req, res) {
  var newPhones = req.body;
  var id = req.params.id;


  await Users.findById(id).then(function (User) {
    User.phones.push(newPhones);
    User.save();
  }).catch(function (e) {
    return console.log(e);
  }).then(res.json({ status: "200" }));
};

UsersController.deleteEmails = async function (req, res) {
  var email = req.params.email;
  var id = req.params.id;


  await Users.update({ _id: id }, { $pull: { emails: { _id: email } } }, { safe: true }).then(function (User) {
    console.log(User);
  }).catch(function (e) {
    return console.log(e);
  }).then(function () {
    res.json({ status: "200" });
  });
};

UsersController.deleteAddresses = async function (req, res) {
  var address = req.params.address;
  var id = req.params.id;


  await Users.update({ _id: id }, { $pull: { addresses: { _id: address } } }, { safe: true }).then(function (response) {
    console.log(User);
  }).catch(function (e) {
    return console.log(e);
  }).then(function () {
    res.json({ status: "200" });
  });
};

UsersController.deletePhones = async function (req, res) {
  var phone = req.params.phone;
  var id = req.params.id;


  await Users.update({ _id: id }, { $pull: { phones: { _id: phone } } }, { safe: true }).then(function (response) {
    console.log(response);
  }).catch(function (e) {
    return console.log(e);
  }).then(function () {
    res.json({ status: "200" });
  });
};

UsersController.deleteUser = async function (req, res) {
  var id = req.params.id;


  await Users.findByIdAndRemove(id).then(function () {
    res.json({ status: "200" });
  });
};

UsersController.getUser = async function (req, res) {
  var id = req.params.id;


  await Users.findById(id).then(function (response) {
    res.json(response);
  });
};

UsersController.pushPaymentCard = async function (req, res) {
  var payment_card = req.body;
  var id = req.params.id;


  await Users.findById(id).then(function (User) {
    User.payment_cards.push(payment_card);
    User.save();
  }).catch(function (e) {
    return console.log(e);
  }).then(res.json({ status: "200" }));
};

UsersController.editPaymentCard = async function (req, res) {
  var id = req.params.id;
  var idcard = req.params.idcard;


  await Users.findOneAndUpdate({ _id: id, "payment_cards._id": idcard }, { $set: { "payment_cards.$": req.body } }).then(function (doc) {
    res.json({ status: "200" });
  }).catch(function (e) {
    console.log(e);
  });
};

UsersController.deletePaymentCard = async function (req, res) {
  var idcard = req.params.idcard;
  var id = req.params.id;


  await Users.update({ _id: id }, { $pull: { payment_cards: { _id: idcard } } }, { safe: true }).then(function (response) {
    console.log(response);
  }).catch(function (e) {
    return console.log(e);
  }).then(function () {
    res.json({ status: "200" });
  });
};

module.exports = UsersController;

/** this ends this file
 * server/controllers/Users.controller
 **/
//# sourceMappingURL=users.controller.js.map