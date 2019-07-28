"use strict";

var clientsController = {};
var Clients = require('../models/clients');;

clientsController.getClients = async function (req, res) {
    var clients = await Clients.find();

    res.json(clients);
};

clientsController.createClient = async function (req, res) {
    var client = new Clients(req.body);

    await client.save(function (err) {
        if (err) {
            res.json({ "error": err });
        } else {
            res.json({ "status": "200" });
        }
    });
};

clientsController.editClientSimpleData = async function (req, res) {
    var id = req.params.id;


    var cliente = await Clients.findById(id);

    cliente.first_name = req.body.first_name;
    cliente.last_name = req.body.last_name;
    cliente.nick_name = req.body.nick_name;
    cliente.tax_id.tax_type = req.body.tax_id.tax_type;
    cliente.tax_id.tax_code = req.body.tax_id.tax_code;
    cliente.emails = cliente.emails;
    cliente.addresses = cliente.addresses;
    cliente.phones = cliente.phones;

    await cliente.save().then(function () {
        res.json({ "status": "200" });
    });
};

clientsController.editEmailsData = async function (req, res) {
    /*
        model for req: 
            {
                "verified": false,
                "email": "correo@pedroruizhidalgo.es"
            }
    */
    var id = req.params.id;
    var email = req.params.email;


    await Clients.findOneAndUpdate({ "_id": id, "emails._id": email }, { '$set': {
            'emails.$': req.body
        } }).then(function (doc) {
        res.json({ "status": "200" });
    }).catch(function (e) {
        console.log(e);
    });
};

clientsController.editAddressData = async function (req, res) {

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


    await Clients.findOneAndUpdate({ "_id": id, "addresses._id": address }, { "$set": { "addresses.$": req.body } }).then(function (doc) {
        res.json({ "status": "200" });
    }).catch(function (e) {
        console.log(e);
    });
};

clientsController.editPhonesData = async function (req, res) {
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


    await Clients.findOneAndUpdate({ "_id": id, "phones._id": phone }, { "$set": { "phones.$": req.body } }).then(function (doc) {
        res.json({ "status": "200" });
    }).catch(function (e) {
        console.log(e);
    });
};

clientsController.pushEmails = async function (req, res) {
    var newEmails = req.body;
    var id = req.params.id;


    await Clients.findById(id).then(function (client) {
        client.emails.push(newEmails);
        client.save();
    }).catch(function (e) {
        console.log(e);
    }).then(res.json({ "status": "200" }));
};

clientsController.pushAddresses = async function (req, res) {
    var newAddresses = req.body;
    var id = req.params.id;


    await Clients.findById(id).then(function (client) {
        client.addresses.push(newAddresses);
        client.save();
    }).catch(function (e) {
        return console.log(e);
    }).then(res.json({ "status": "200" }));
};

clientsController.pushPhones = async function (req, res) {
    var newPhones = req.body;
    var id = req.params.id;


    await Clients.findById(id).then(function (client) {
        client.phones.push(newPhones);
        client.save();
    }).catch(function (e) {
        return console.log(e);
    }).then(res.json({ "status": "200" }));
};

clientsController.deleteEmails = async function (req, res) {
    var email = req.params.email;
    var id = req.params.id;


    await Clients.update({ _id: id }, { $pull: { emails: { _id: email } } }, { safe: true }).then(function (client) {
        console.log(client);
    }).catch(function (e) {
        return console.log(e);
    }).then(function () {
        res.json({ "status": "200" });
    });
};

clientsController.deleteAddresses = async function (req, res) {
    var address = req.params.address;
    var id = req.params.id;


    await Clients.update({ _id: id }, { $pull: { addresses: { _id: address } } }, { safe: true }).then(function (response) {
        console.log(client);
    }).catch(function (e) {
        return console.log(e);
    }).then(function () {
        res.json({ "status": "200" });
    });
};

clientsController.deletePhones = async function (req, res) {
    var phone = req.params.phone;
    var id = req.params.id;


    await Clients.update({ _id: id }, { $pull: { phones: { _id: phone } } }, { safe: true }).then(function (response) {
        console.log(response);
    }).catch(function (e) {
        return console.log(e);
    }).then(function () {
        res.json({ "status": "200" });
    });
};

clientsController.deleteClient = async function (req, res) {
    var id = req.params.id;


    await Clients.findByIdAndRemove(id).then(function () {
        res.json({ "status": "200" });
    });
};

clientsController.getClient = async function (req, res) {
    var id = req.params.id;


    await Clients.findById(id).then(function (response) {
        res.json(response);
    });
};

clientsController.pushPaymentCard = async function (req, res) {
    var payment_card = req.body;
    var id = req.params.id;


    await Clients.findById(id).then(function (client) {
        client.payment_cards.push(payment_card);
        client.save();
    }).catch(function (e) {
        return console.log(e);
    }).then(res.json({ "status": "200" }));
};

clientsController.editPaymentCard = async function (req, res) {
    var id = req.params.id;
    var idcard = req.params.idcard;


    await Clients.findOneAndUpdate({ "_id": id, "payment_cards._id": idcard }, { "$set": { "payment_cards.$": req.body } }).then(function (doc) {
        res.json({ "status": "200" });
    }).catch(function (e) {
        console.log(e);
    });
};

clientsController.deletePaymentCard = async function (req, res) {
    var idcard = req.params.idcard;
    var id = req.params.id;


    await Clients.update({ _id: id }, { $pull: { payment_cards: { _id: idcard } } }, { safe: true }).then(function (response) {
        console.log(response);
    }).catch(function (e) {
        return console.log(e);
    }).then(function () {
        res.json({ "status": "200" });
    });
};

module.exports = clientsController;

/** this ends this file
* server/controllers/clients.controller
**/
//# sourceMappingURL=clients.controller.js.map