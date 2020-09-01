const mongoose = require( 'mongoose' )

const GuildConfigSchema = new mongoose.Schema({
    guildId:{
        type: String,
        required: true,
        unique: true
    },
    prefix: {
        type: String,
        require: true,
        default: "$"
    },
    defaultRole: {
        type: String,
        required: false
    },
    memberLogChannel:{
        type: String,
        required:false
    }
})

module.exports = mongoose.model('GuildConfig', GuildConfigSchema)