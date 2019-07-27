"use strict";

var SuppliersController = {};

var Suppliers = require('../models/suppliers');

SuppliersController.getSuppliers = async function (req, res) {
    var suppliers = await Suppliers.find();

    res.json(suppliers);
};

SuppliersController.createSupplier = async function (req, res) {
    var supplier = req.body;

    Suppliers.create(supplier).then(function (response) {
        console.log(response.id, "Supplier was created");
        res.json({ "status": "200" });
    }).catch(function (err) {
        res.json(err.message);
        console.log(err.message);
    });
};

SuppliersController.deleteSupplier = async function (req, res) {
    var id = req.params.id;


    Suppliers.findByIdAndRemove(id).then(function (response) {
        console.log('Deleted supplier: ', response.id);
        res.json({ "status": "200" });
    }).catch(function (e) {
        res.json(e);
    });
};

SuppliersController.editSupplier = async function (req, res) {
    var id = req.params.id;

    data = req.body;

    Suppliers.findOneAndUpdate({ "_id": id }, { "$set": data }).then(function (response) {
        res.json({ "status": "200" });
        console.log(response._id, "Was updated");
    }).catch(function (e) {
        res.json(e.message);
    });
};

SuppliersController.getSupplier = async function (req, res) {
    var id = req.params.id;


    Suppliers.findById(id).then(function (supplier) {
        res.json(supplier);
    }).catch(function (e) {
        res.json(e.message);
    });
};

module.exports = SuppliersController;

/** this ends this file
* server/controllers/suppliers.controller
**/