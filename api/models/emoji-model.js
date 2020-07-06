const mongoose = require('mongoose')
const Schema = mongoose.Schema

let Emoji = new Schema(
  {
    _id: { type: String },
    count: { type: Number },
    type: { type: String }
  },
  { timestamps: true }
)

module.exports = mongoose.model('emojis', Emoji)
