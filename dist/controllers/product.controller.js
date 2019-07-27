"use strict";

var productController = {};
var Product = require('../models/products');

productController.getProducts = async function (req, res) {
    // console.log('api/products/   ---getProducts');
    var products = await Product.find();

    res.json({ products: products });
};

productController.getCount = async function (req, res) {
    var count = await Product.countDocuments();

    res.json(count);
};

productController.createProduct = async function (req, res) {
    var product = new Product(req.body);

    await product.save(function (err) {
        if (err) {
            res.json({ "error": err });
        } else {
            res.json({ "status": "200" });
        }
    });
};

productController.editProduct = async function (req, res) {
    var id = req.params.id;


    var product = {
        code: req.body.code,
        description: req.body.description,
        size: req.body.size,
        weight: req.body.weight,
        price: req.body.price,
        discount: req.body.discount,
        on_sale: req.body.on_sale,
        active: req.body.active,
        stock: req.body.stock,
        broken_stock: req.body.broken_stock,
        to_serve: req.body.to_serve,
        to_receive: req.body.to_receive,
        ubication: req.body.ubication,
        images: req.body.images
    };

    await Product.findByIdAndUpdate(id, { $set: product }, { new: true });

    res.json({ "status": "200" });
};

productController.getActives = async function (req, res) {
    var products = await Product.find({ "active": true });

    res.json(products);
};

productController.getInactives = async function (req, res) {
    var products = await Product.find({ "active": false });

    res.json(products);
};

productController.getActivesCount = async function (req, res) {
    var products = await Product.find({ "active": true }).countDocuments();

    res.json(products);
};

productController.getInactivesCount = async function (req, res) {
    var products = await Product.find({ "active": false }).countDocuments();

    res.json(products);
};

productController.getProduct = async function (req, res) {
    var product = await Product.findById(req.params.id);

    res.json(product);
};

productController.deleteProduct = async function (req, res) {
    var id = req.params.id;


    await Product.findByIdAndRemove(id);

    res.json({ "status": "200" });
};

productController.activateProduct = async function (req, res) {
    console.log(req.params);
    var id = req.params.id;


    await Product.update({ _id: id }, { $set: { active: true } }, function () {
        res.json({ "status": "200" });
    });
};

productController.deactivateProduct = async function (req, res) {
    console.log(req.params);
    var id = req.params.id;


    await Product.update({ _id: id }, { $set: { active: false } }, function () {
        res.json({ "status": "200" });
    });
};

productController.addImage = async function (req, res) {
    var id = req.params.id;


    var image = {
        image: req.body.image
    };
    var product = await Product.findById(req.params.id);

    product.images.push(image);
    await product.save(function (err) {
        if (err) {
            res.json(err);
        } else {
            res.json({ "status": "200" });
        }
    });
};

productController.brokenStock = async function (req, res) {
    var broken = await Product.find({ $where: "this.broken_stock >= this.stock" });

    res.json(broken);
};

module.exports = productController;

/** this ends this file
* server/controllers/product.controller
**/