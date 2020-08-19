const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

const vendorsSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    code:{
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
MSMED: {
        type: String,
        required: true
    }
},
{
    timestamps:true
});


var vendors=mongoose.model('vendor',vendorsSchema);

module.exports = vendors;