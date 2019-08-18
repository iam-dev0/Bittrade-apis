"use strict";

var _azure = require("../azure");

var _util = require("../utils/util");

var _uuidV = require("uuid-v4");

var _uuidV2 = _interopRequireDefault(_uuidV);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Product = require("../models/products");


var productController = {};

// productController.getProducts = async (req, res) => {
//   // console.log('api/products/   ---getProducts');
//   const products = await Product.find();

//   res.json({ products });
// };

productController.getCount = async function (req, res) {
  var count = await Product.countDocuments();

  res.json(count);
};

productController.createProduct = async function (req, res) {
  try {
    var errors = (0, _util.myValidationResult)(req).array(); // Finds the validation errors in this request and wraps them in an object with handy functions

    if (errors.length > 0) {
      res.status(422).json({ errors: errors });
      return;
    }
    var files = req.files;
    var _req$body = req.body,
        description = _req$body.description,
        title = _req$body.title,
        price = _req$body.price,
        stock = _req$body.stock;

    var imagesUrl = [];
    if (files && files.length > 0) {
      files.map(function (file) {

        var filename = Date.now() + "-" + (0, _uuidV2.default)() + file.originalname;
        var containerUrl = (0, _azure.containerUrlFrom)();
        var BlockBlobURL = (0, _azure.BlockBlobURLFrom)(containerUrl, filename);
        (0, _azure.uploadStream)(BlockBlobURL, file).then(function () {
          return console.log("files uploaded to server");
        }).catch(function (error) {
          return console.log("Error - " + error);
        });
        imagesUrl.push(BlockBlobURL.url);
      });
    }

    var product = new Product({ description: description, title: title, price: price, stock: stock, images: imagesUrl });

    await product.save(function (err) {
      if (err) {
        res.json({ error: err });
      } else {
        res.json({ status: "200", product: product });
      }
    });
  } catch (err) {
    res.json({ error: err });
  }
};

productController.getProductsPagination = async function (req, res, next) {
  var perPage = 10;
  var page = req.query.page || 1;

  Product.find({}).skip(perPage * page - perPage).limit(perPage).exec(function (err, products) {
    if (err) return next(err);
    Product.count().exec(function (err, count) {
      if (err) return next(err);
      res.json({
        products: products,
        current: page,
        pages: Math.ceil(count / perPage)
      });
    });
  });
};
//Todo-- implement it correclty
productController.editProduct = async function (req, res) {
  var _id = req.params._id;


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

  res.json({ status: "200" });
};

productController.getActives = async function (req, res) {
  var products = await Product.find({ active: true });

  res.json(products);
};

productController.getInactives = async function (req, res) {
  var products = await Product.find({ active: false });

  res.json(products);
};

productController.getActivesCount = async function (req, res) {
  var products = await Product.find({ active: true }).countDocuments();

  res.json(products);
};

productController.getInactivesCount = async function (req, res) {
  var products = await Product.find({ active: false }).countDocuments();

  res.json(products);
};

productController.getProduct = async function (req, res) {
  var product = await Product.findById(req.params._id);

  res.json(product);
};

productController.deleteProduct = async function (req, res) {
  var id = req.params.id;


  await Product.findByIdAndRemove(id);

  res.json({ status: "200" });
};

productController.activateProduct = async function (req, res) {
  console.log(req.params);
  var id = req.params.id;


  await Product.update({ _id: id }, { $set: { active: true } }, function () {
    res.json({ status: "200" });
  });
};

productController.deactivateProduct = async function (req, res) {
  console.log(req.params);
  var id = req.params.id;


  await Product.update({ _id: id }, { $set: { active: false } }, function () {
    res.json({ status: "200" });
  });
};

productController.addImage = async function (req, res) {
  var _id = req.params._id;


  var image = {
    image: req.body.image
  };
  var product = await Product.findById(_id);

  product.images.push(image);
  await product.save(function (err) {
    if (err) {
      res.json(err);
    } else {
      res.json({ status: "200" });
    }
  });
};

productController.brokenStock = async function (req, res) {
  var broken = await Product.find({
    $where: "this.broken_stock >= this.stock"
  });

  res.json(broken);
};

module.exports = productController;

/** this ends this file
 * server/controllers/product.controller
 **/
//# sourceMappingURL=product.controller.js.map