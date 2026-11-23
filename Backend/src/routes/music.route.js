const express = require('express')
const router = express.Router()
const multer = require('multer')
const middleware = require('../middleware/auth.middleware')
const musicController = require('../controllers/music.controller')
const upload = multer({
    storage: multer.memoryStorage()
})

router.post('/music', middleware.authArtist, upload.single('file'), musicController.createMusic)
router.post('/music/album', middleware.authArtist, musicController.createAlbum)
router.get('/music', middleware.authArtist, musicController.getAllMusic)
router.get('/music/album', middleware.authArtist, musicController.getAllAlbum)

module.exports = router