const Product = require("../models/products");
import { containerUrlFrom, BlockBlobURLFrom, uploadStream } from "../azure";
import {myValidationResult} from "../utils/util"
import uuid from "uuid-v4";
import favoriteProduct from "../models/favoriteProducts";

const productController = {};




// productController.getProducts = async (req, res) => {
//   // console.log('api/products/   ---getProducts');
//   const products = await Product.find();

//   res.json({ products });
// };

productController.getCount = async (req, res) => {
  const count = await Product.countDocuments();

  res.json(count);
};

productController.createProduct = async (req, res) => {
  try {
    const errors = myValidationResult(req).array(); // Finds the validation errors in this request and wraps them in an object with handy functions

    if (errors.length>0) {
      res.status(422).json({ errors: errors});
      return;
    }
    const {files}=req;
    const {description,title,price,stock}=req.body;
    let imagesUrl = [];
    if (files && files.length>0) {
        files.map(file => {
       
          let filename = `${Date.now()}-${uuid()}${file.originalname}`;
          const containerUrl = containerUrlFrom();
          const BlockBlobURL = BlockBlobURLFrom(containerUrl, filename);
          uploadStream(BlockBlobURL, file)
            .then(() => console.log("files uploaded to server"))
            .catch(error => console.log(`Error - ${error}`));
          imagesUrl.push(BlockBlobURL.url);
        
      });
    
    }

    const product = new Product({description,title,price,stock,images:imagesUrl});

    await product.save(err => {
      if (err) {
        res.json({ error: err });
      } else {
        res.json({ status: "200", product });
      }
    });
  } catch (err) {
    res.json({ error: err });
  }
};

productController.getProductsPagination=async (req, res, next)=> {
  var perPage = 10
  var page = req.query.page || 1

  Product
      .find({})
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .exec((err, products) =>{
        if (err) return next(err)
          Product.count().exec((err, count)=> {
              if (err) return next(err)
              res.json({
                  products: products,
                  current: page,
                  pages: Math.ceil(count / perPage)
              })
          })
      })
}

productController.AddFavoriteProduct=async (req, res, next)=> {
  try {
    // const errors = myValidationResult(req).array(); // Finds the validation errors in this request and wraps them in an object with handy functions

    // if (errors.length>0) {
    //   res.status(422).json({ errors: errors});
    //   return;
    // }
  
    const {userId,productid}=req.body;
    
    Product.findOne({ productid }, async (err, data) =>{
      if (err) {
        res.status(422).json({ errors: res });
        return;
      }
      if (data) {
        const favoriteproduct = new favoriteProduct({userId,product:data});

    await favoriteproduct.save(err => {
      if (err) {
        res.status(400).json({ error: err });
      } else {
        res.status(200).json({ status: "200", favoriteproduct });
      }
    });
      } else {
        res.status(400).json({success:false,message:"This product doesn't exsist"});
      }
    });
    

  } catch (err) {
    res.status(400).json({ error: err });
  }
}


productController.GetFavoriteProducts=async (req, res, next)=> {

  const id=req.params.id;
    
  favoriteProduct.find({ userId:id }, function(err, data) {
    if (err) {
      res.status(422).json({ errors: res });
      return;
    }
    if (data) {
      res.status(200).json({success:true,message:"There is the list of your favorite Products",product:data});
    } else {
      res.status(400).json({success:false,message:"You don't have any Faviorate right now"});
    }
  });
  
}

productController.removeFavoriteProduct = async (req, res) => {
  const { productid,userId } = req.query;
  Product.
  remove({_id:userId,product:{_id:productid}},function(err, obj) {
     if (err)  res.status(400).json({ error: err });
    console.log(obj.result.n + " document(s) deleted");
  })

};

















//Todo-- implement it correclty
productController.editProduct = async (req, res) => {
  const { _id} = req.params;
   
  const product = {
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

productController.getActives = async (req, res) => {
  const products = await Product.find({ active: true });

  res.json(products);
};

productController.getInactives = async (req, res) => {
  const products = await Product.find({ active: false });

  res.json(products);
};

productController.getActivesCount = async (req, res) => {
  const products = await Product.find({ active: true }).countDocuments();

  res.json(products);
};

productController.getInactivesCount = async (req, res) => {
  const products = await Product.find({ active: false }).countDocuments();

  res.json(products);
};

productController.getProduct = async (req, res) => {
  const product = await Product.findById(req.params._id);

  res.json(product);
};

productController.deleteProduct = async (req, res) => {
  const { id } = req.params;

  await Product.findByIdAndRemove(id);

  res.json({ status: "200" });
};

productController.activateProduct = async (req, res) => {
  console.log(req.params);
  const { id } = req.params;

  await Product.update({ _id: id }, { $set: { active: true } }, () => {
    res.json({ status: "200" });
  });
};

productController.deactivateProduct = async (req, res) => {
  console.log(req.params);
  const { id } = req.params;

  await Product.update({ _id: id }, { $set: { active: false } }, () => {
    res.json({ status: "200" });
  });
};

productController.addImage = async (req, res) => {
  const { _id } = req.params;

  const image = {
    image: req.body.image
  };
  const product = await Product.findById(_id);

  product.images.push(image);
  await product.save(err => {
    if (err) {
      res.json(err);
    } else {
      res.json({ status: "200" });
    }
  });
};

productController.brokenStock = async (req, res) => {
  const broken = await Product.find({
    $where: "this.broken_stock >= this.stock"
  });

  res.json(broken);
};

module.exports = productController;

/** this ends this file
 * server/controllers/product.controller
 **/
