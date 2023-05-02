const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    testMap: {
        type: Map,
        of: String
    },
    map: Map
})

module.exports = mongoose.model('UserModel', UserSchema)
