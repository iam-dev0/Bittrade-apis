import Card from "../models/card"
import Product from "../models/products"

const cardController = {};

cardController.addToCard=async (req, res, next)=> {
    try {
      const errors = myValidationResult(req).array(); // Finds the validation errors in this request and wraps them in an object with handy functions
  
      if (errors.length>0) {
        res.status(422).json({ errors: errors});
        return;
      }
    
      const {userId,productid}=req.body;
      
      Product.findOne({ productid }, function(err, data) {
        if (err) {
          res.status(422).json({ errors: res });
          return;
        }
        if (data) {
          const Card = new Card({userId,product:data});
  
      await Card.save(err => {
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
  
cardController.getCard=async (req, res, next)=> {
  
    const id=req.params.id;
      
    favoriteProduct.find({ userId:id }, function(err, data) {
      if (err) {
        res.status(422).json({ errors: res });
        return;
      }
      if (data) {
        res.status(200).json({success:true,message:"There is the list of your Products in card",product:data});
      } else {
        res.status(400).json({success:false,message:"Sorry your card is empty"});
      }
    });
    
  }
cardController.removeCardProduct = async (req, res) => {
const { productid,userId } = req.query;
Product.
remove({_id:userId,product:{_id:productid}},function(err, obj) {
    if (err)  res.status(400).json({ error: err });
    console.log(obj.result.n + " document(s) deleted");
})

};
    
  
  
module.exports = cardController;

/** this ends this file
* server/controllers/card.controller
**/
