const mongoose = require('mongoose')
const Schema = mongoose.Schema

const roomSchema = new Schema ({
    room: {
        type: Number,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        default: ''
    }
})

module.exports = mongoose.model('rooms', roomSchema)
