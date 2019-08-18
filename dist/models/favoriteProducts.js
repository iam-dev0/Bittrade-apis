'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var favoriteProductSchema = new Schema({
  email: { type: String, required: true },
  productId: {}
}, { timestamps: true, autoIndex: true });

module.exports = mongoose.model('favoriteproduct', favoriteProductSchema);
//# sourceMappingURL=favoriteProducts.js.map