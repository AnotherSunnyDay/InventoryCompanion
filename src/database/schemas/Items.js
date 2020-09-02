const mongoose = require( 'mongoose' )

const ItemsSchema = new mongoose.Schema({
    ownerType:{
        type:String,
        required: true
    },
    guildId:{
        type:String,
        required: true
    },
    ownerId:{
        type:mongoose.Schema.Types.Number,
        required:false,
    },
    name:{
        type: String,
        required: true,
    },
    quantity:{
        type: mongoose.Schema.Types.Number,
        required: false,
        default: 1
    }
})

module.exports = mongoose.model('Items', ItemsSchema)