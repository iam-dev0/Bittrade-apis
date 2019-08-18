
const mongoose = require('mongoose');
const { Schema }  = mongoose;

const cardSchema = new Schema(
    {
      userid:{ type: String, required: true },
      product:{type:Object, required:true}
    },
    {timestamps: true, autoIndex: true}
);



module.exports = mongoose.model('card', cardSchema);
