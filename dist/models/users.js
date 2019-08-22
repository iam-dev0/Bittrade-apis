"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var ClientSchema = new Schema({
    name: { type: String, required: true },
    // last_name: { type: String, required: false },
    //nick_name: { type: String, required: false, description: "too known as... as trade marks, and other"},

    // emails: [
    //   {
    //     email: { type: String, required: true },
    //     verified: { type: Boolean, required: false, default: false },

    //     required: false
    //   }
    // ],
    email: { type: String, required: true },
    password: { type: String, required: true },
    verified: { type: Boolean, required: false, default: false }

    // addresses: [{
    //     contact: {type: String, required: false, description: "use if client is not your contact"},
    //     street: { type: String, required: true },
    //     city: { type: String, required: true },
    //     province: { type: String, required: true },
    //     zip: { type: String, required: true },

    //     required: false
    // }],
    // phones: [{
    //     phoneType: { type: String, required: false },
    //     prefix: { type: String, required: false},
    //     number: { type: String, required: true },
    //     subfix: { type: String, requied: false},
    //     memo: { type: String, required: false, description: "use if you need other data" },

    //     required: false
    // }],
    // payment_cards: [{
    //     card_name: { type: String, requied: true, index: true, trim: true},
    //     card_number: { type: String, required: true, index: true, trim: true},
    //     expiry_date: { type: Date, requied: true, trim: true},
    //     zip: { type: String, trim: true, required: false},

    //     requied: false
    // }]
}, { timestamps: true, autoIndex: true });

ClientSchema.index;

module.exports = mongoose.model("users", ClientSchema);
//# sourceMappingURL=users.js.map