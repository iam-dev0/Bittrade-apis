'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var favoriteProductSchema = new Schema({
  userid: { type: String, required: true },
  product: { type: Object, required: true }
}, { timestamps: true, autoIndex: true });

module.exports = mongoose.model('favoriteproduct', favoriteProductSchema);
//# sourceMappingURL=favoriteProducts.js.map