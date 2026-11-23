const ImageKit = require('@imagekit/nodejs')

const client = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
})

const fileUpload = async(Buffer, originalName) => {
    try{
        const response = await client.files.upload({
            file: Buffer.toString('base64'),
            fileName: "music_"+originalName+Date.now()
        })

        console.log(response)
        return response
    }catch(error){
        console.log(`Error while uploading file: ${error.message}`)
        res.status(500).json({ message: error.message })
    }
}

module.exports = fileUpload