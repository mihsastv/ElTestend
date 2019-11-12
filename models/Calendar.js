const mongoose = require('mongoose')
const Schema = mongoose.Schema

const calendarSchema = new Schema ({
    date: {
        type: Number,
        required: true,
    },
    avail: {
        type: Boolean,
        default: 'false'
    },
    room: {
        type: Number,
        required: true,
    }

})

module.exports = mongoose.model('calendar', calendarSchema)
