const express = require('express')

const EmojiCtrl = require('../controllers/emoji-ctrl')

const router = express.Router()

router.post('/addEmoji', EmojiCtrl.addEmoji)
router.put('/emoji/:id', EmojiCtrl.count)
//router.delete('/movie/:id', MovieCtrl.deleteMovie)
//router.get('/movie/:id', MovieCtrl.getMovieById)
router.get('/emojicount', EmojiCtrl.getEmojiCount)
router.get('/emojis', EmojiCtrl.getEmojis)
router.post('/createHeart', EmojiCtrl.createHeartEmoji)

module.exports = router
