const mongoose = require( 'mongoose' )

const CurrencySchema = new mongoose.Schema({
    ownerType:{
        type:String,
        required: true
    },
    ownerId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    quantity:{
        type: mongoose.Schema.Types.Number,
        required: true,
    },
    type:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Currency', CurrencySchema)