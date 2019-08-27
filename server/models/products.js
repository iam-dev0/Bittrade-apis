import mongoose from "mongoose";
const { Schema } = mongoose;
const productSchema = new Schema(
    {
        description: { type: String, required: true },
       // size: { type: String, required: true },
       // weight: { type: String, required: true },
        title:{type:String, required: true},
        price: { type: Number, required: true },
//discount: { type: Number, required: true },
      //  on_sale: { type: Boolean, default: false },
      //  active: { type: Boolean, default:false },
        stock: { type: Number, required: true },
       // broken_stock: { type: Number, required: false },
     //   to_serve: { type: Number, required: false },
     //   to_receive: { type: Number, required: false },
     //   ubication: { type: String, required: false },
        images: [{ type: String }]
    },
    {timestamps: true, autoIndex: true}
);


const Product= mongoose.model("products", productSchema);

export default Product;