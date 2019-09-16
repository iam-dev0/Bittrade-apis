import { myValidationResult } from "../utils/util";
import User from "../models/users";
const UsersController = {};


UsersController.getUsers = async (req, res) => {
  const User = await User.find();

  res.json(User);
};

UsersController.createUser = async (req, res) => {
  try {
    const errors = myValidationResult(req).array(); // Finds the validation errors in this request and wraps them in an object with handy functions
    if (errors.length > 0) {
      res.status(422).json({ errors: errors });
      return;
    }
    const { name, email, password } = req.body;

    User.findOne({ email }, function(err, data) {
      if (err) {
        res.status(422).json({ errors: err });
        return;
      }
      if (!data) {
        const user = new User({ name, email, password });

        user.save(err => {
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

UsersController.Login = async (req, res) => {
  const errors = myValidationResult(req).array(); // Finds the validation errors in this request and wraps them in an object with handy functions
  if (errors.length > 0) {
    res.status(422).json({ errors: errors });
    return;
  }
  const { email, password } = req.body;
  User.findOne({ email }, function(err, data) {
    if (err) {
      res.status(422).json({ errors: res });
      return;
    }
    if (data) {
      if (data.password === password) {
        //console.log("Done Login");
        //req.session.userId = data.unique_id;
        //console.log(req.session.userId);
        res.status(200).json({ success:true,message:"Successfully login", name: data.name, email: data.email,id:data._id });
      } else {
        res.status(400).json({success:false,message:"login fail"});
      }
    } else {
      res.status(400).json({success:false,message:"This Email Is not regestered!"});
    }
  });
};

UsersController.editUsersimpleData = async (req, res) => {
  const { id } = req.params;

  let Usere = await Users.findById(id);

  Usere.first_name = req.body.first_name;
  Usere.last_name = req.body.last_name;
  Usere.nick_name = req.body.nick_name;
  Usere.tax_id.tax_type = req.body.tax_id.tax_type;
  Usere.tax_id.tax_code = req.body.tax_id.tax_code;
  Usere.emails = Usere.emails;
  Usere.addresses = Usere.addresses;
  Usere.phones = Usere.phones;

  await Usere.save().then(() => {
    res.json({ status: "200" });
  });
};

UsersController.editEmailsData = async (req, res) => {
  /*
        model for req: 
            {
                "verified": false,
                "email": "correo@pedroruizhidalgo.es"
            }
    */
  const { id } = req.params;
  const { email } = req.params;

  await Users.findOneAndUpdate(
    { _id: id, "emails._id": email },
    {
      $set: {
        "emails.$": req.body
      }
    }
  )
    .then(doc => {
      res.json({ status: "200" });
    })
    .catch(e => {
      console.log(e);
    });
};

UsersController.editAddressData = async (req, res) => {
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

  const { id } = req.params;
  const { address } = req.params;

  await Users.findOneAndUpdate(
    { _id: id, "addresses._id": address },
    { $set: { "addresses.$": req.body } }
  )
    .then(doc => {
      res.json({ status: "200" });
    })
    .catch(e => {
      console.log(e);
    });
};

UsersController.editPhonesData = async (req, res) => {
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

  const { id } = req.params;
  const { phone } = req.params;

  await Users.findOneAndUpdate(
    { _id: id, "phones._id": phone },
    { $set: { "phones.$": req.body } }
  )
    .then(doc => {
      res.json({ status: "200" });
    })
    .catch(e => {
      console.log(e);
    });
};

UsersController.pushEmails = async (req, res) => {
  const newEmails = req.body;
  const { id } = req.params;

  await Users.findById(id)
    .then(User => {
      User.emails.push(newEmails);
      User.save();
    })
    .catch(e => {
      console.log(e);
    })
    .then(res.json({ status: "200" }));
};

UsersController.pushAddresses = async (req, res) => {
  const newAddresses = req.body;
  const { id } = req.params;

  await Users.findById(id)
    .then(User => {
      User.addresses.push(newAddresses);
      User.save();
    })
    .catch(e => console.log(e))
    .then(res.json({ status: "200" }));
};

UsersController.pushPhones = async (req, res) => {
  const newPhones = req.body;
  const { id } = req.params;

  await Users.findById(id)
    .then(User => {
      User.phones.push(newPhones);
      User.save();
    })
    .catch(e => console.log(e))
    .then(res.json({ status: "200" }));
};

UsersController.deleteEmails = async (req, res) => {
  const { email } = req.params;
  const { id } = req.params;

  await Users.update(
    { _id: id },
    { $pull: { emails: { _id: email } } },
    { safe: true }
  )
    .then(User => {
      console.log(User);
    })
    .catch(e => console.log(e))
    .then(() => {
      res.json({ status: "200" });
    });
};

UsersController.deleteAddresses = async (req, res) => {
  const { address } = req.params;
  const { id } = req.params;

  await Users.update(
    { _id: id },
    { $pull: { addresses: { _id: address } } },
    { safe: true }
  )
    .then(response => {
      console.log(User);
    })
    .catch(e => console.log(e))
    .then(() => {
      res.json({ status: "200" });
    });
};

UsersController.deletePhones = async (req, res) => {
  const { phone } = req.params;
  const { id } = req.params;

  await Users.update(
    { _id: id },
    { $pull: { phones: { _id: phone } } },
    { safe: true }
  )
    .then(response => {
      console.log(response);
    })
    .catch(e => console.log(e))
    .then(() => {
      res.json({ status: "200" });
    });
};

UsersController.deleteUser = async (req, res) => {
  const { id } = req.params;

  await Users.findByIdAndRemove(id).then(() => {
    res.json({ status: "200" });
  });
};

UsersController.getUser = async (req, res) => {
  const { id } = req.params;

  await Users.findById(id).then(response => {
    res.json(response);
  });
};

UsersController.pushPaymentCard = async (req, res) => {
  const payment_card = req.body;
  const { id } = req.params;

  await Users.findById(id)
    .then(User => {
      User.payment_cards.push(payment_card);
      User.save();
    })
    .catch(e => console.log(e))
    .then(res.json({ status: "200" }));
};

UsersController.editPaymentCard = async (req, res) => {
  const { id } = req.params;
  const { idcard } = req.params;

  await Users.findOneAndUpdate(
    { _id: id, "payment_cards._id": idcard },
    { $set: { "payment_cards.$": req.body } }
  )
    .then(doc => {
      res.json({ status: "200" });
    })
    .catch(e => {
      console.log(e);
    });
};

UsersController.deletePaymentCard = async (req, res) => {
  const { idcard } = req.params;
  const { id } = req.params;

  await Users.update(
    { _id: id },
    { $pull: { payment_cards: { _id: idcard } } },
    { safe: true }
  )
    .then(response => {
      console.log(response);
    })
    .catch(e => console.log(e))
    .then(() => {
      res.json({ status: "200" });
    });
};

module.exports = UsersController;

/** this ends this file
 * server/controllers/Users.controller
 **/
