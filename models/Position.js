const mongoose = require('mongoose')
const Schema = mongoose.Schema

const positionSchema = new Schema ({
  name: {
    type: String,
    required: true
  },
  coast: {
    type: number,
    required: true
  },
  category: {
    ref: 'categories',
    type: Schema.Types.ObjectID
  },
  category: {
    ref: 'users',
    type: Schema.Types.ObjectID
  }
})

module.exports = mongoose.model('positions', positionSchema)
