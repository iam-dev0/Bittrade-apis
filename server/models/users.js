import mongoose from "mongoose";
const { Schema } = mongoose;

const ClientSchema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: false },
    profile_image:{type:String,requied:false},
    email: { type: String, required: true },
    password: { type: String, required: true },
    email_verified: { type: Boolean, required: false, default: false },
    addresses_is_available: { type: Boolean, required: true, default: false },
    addresses: {
      house: { type: String, required: false },
      street: { type: String, required: false },
      city: { type: String, required: false },
      province: { type: String, required: false },
      zip: { type: String, required: false },
      required: false
    },
    phone: { type: String, required: false,default:''},
    phone_verified: { type: Boolean, required: false, default: false },
    phone_added: { type: Boolean, required: false, default: false },
    payment_method_added: { type: Boolean, requied: false, default: false },
    payment_method: [
      {
        type: { type: String, requied: true, index: true, trim: true },
        card_number: { type: String, required: false, index: true, trim: true },
        expiry_date: { type: Date, requied: false, trim: true },
        walet_address: { type: String, requied: false },
        zip: { type: String, trim: false, required: false },

        requied: false
      }
    ]
  },
  { timestamps: true, autoIndex: true }
);

ClientSchema.index;
const User = mongoose.model("users", ClientSchema);

export default User;
