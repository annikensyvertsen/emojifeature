//const emojiModel = require('../models/emoji-model')
let Emoji = require('../models/emoji-model')

const createHeartEmoji = (req, res) => {
  let body = req.body
  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide an emoji'
    })
  }
  let emoji = new Emoji(body)
  if (!emoji) {
    return res.status(400).json({ success: false, error: 'err' })
  }
  emoji.save().then(() => {
    return res
      .status(201)
      .json({
        success: true,
        id: emoji._id,
        message: 'emoji created'
      })
      .catch(error => {
        return res.status(400).json({
          error,
          message: 'Emoji not created'
        })
      })
  })
}

const getEmojis = async (req, res) => {
  await Emoji.find({}, (err, emojis) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    if (!emojis.length) {
      return res.status(404).json({ success: false, error: `Movie not found` })
    }
    return res.status(200).json({ success: true, data: emojis })
  }).catch(err => console.log(err))
}

const addEmoji = (req, res) => {
  const body = req.body
  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide an emoji'
    })
  }

  const emoji = new Emoji(body)

  if (!emoji) {
    return res.status(400).json({ success: false, error: 'err' })
  }

  emoji
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: emoji._id,
        message: 'Emoji created!'
      })
    })
    .catch(error => {
      return res.status(400).json({
        error,
        message: 'Emoji not created!'
      })
    })
}

const getEmojiCount = async (req, res) => {
  await Emoji.findOne({ _id: req.params.id }, (err, emoji) => {
    console.log('how many emojis', emoji)
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }

    if (!emoji) {
      return res.status(404).json({ success: false, error: `Emoji not found` })
    }
    return res.status(200).json({ success: true, data: emoji.count })
  }).catch(err => console.log(err))
}

//add
const count = (req, res) => {
  Emoji.findOne({ _id: req.params.id }, (err, emoji) => {
    if (err) {
      return res.status(404).json({
        err,
        message: 'Emoji not found!'
      })
    }

    emoji.count += 1
    emoji
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: emoji._id,
          count: emoji.count,
          message: 'Emojicount updated!'
        })
      })
      .catch(error => {
        return res.status(404).json({
          error,
          message: 'Emojicount not updated!'
        })
      })
  })
}

module.exports = {
  count,
  addEmoji,
  getEmojiCount,
  createHeartEmoji,
  getEmojis
}
