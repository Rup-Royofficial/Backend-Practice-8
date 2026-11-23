const albumModel = require("../models/album.model");
const musicModel = require("../models/music.model");
const fileUpload = require("../services/storage.service");

const createMusic = async(req,res) => {
    try{
        const user = req.user
        const {buffer,originalname} = req.file
        // console.log(req.file);
        
        
        const {title} = req.body
        // console.log(title);
        
        if(user.role!=='artist') return res.status(401).json({ message: 'Unauthorized' })
        // console.log(user)
        const storedMusic = await fileUpload(buffer, originalname)
        const music = await musicModel.create({
            uri: storedMusic.url,
            title: title.toString(),
            author: user.id
        })
        // console.log(storedMusic);
        res.status(201).json({
            message: 'Music stored successfully',
            role: user.role,
            name: storedMusic.name,
            type: storedMusic.audioCodec,
            url: storedMusic.url,
            music: music,
        })
    }catch(error){
        res.status(400).json({
            message: `Error while creating music: ${error.message}`
        })
    }
}

const createAlbum = async(req,res) => {
    try{
        const { title, music } = req.body
        const id = req.user.id

        const album = await albumModel.create({
            title: title,
            musics: music,
            artist: id
        })

        res.status(201).json({
            message: 'album created successfully',
            album: {
                id: album._id,
                artist: album.artist,
                title: album.title,
                musics: album.musics,
            }
        })
    }catch(error){
        res.status(404).json({
            message: error.message
        })
    }
}

const getAllMusic = async(req,res) => {
    const musics = await musicModel
        .find()
        .populate("author", "username email")

    res.status(200).json({
        message: "Musics fetched successfully",
        musics: musics,
    })
}

const getAllAlbum = async(req,res) => {
    const albums = await albumModel.find().select("title artist").populate("artist", "username email")

    res.status(200).json({
        message: "Albums fetched successfully",
        albums: albums,
    })

}

module.exports = { createMusic, createAlbum, getAllMusic, getAllAlbum }