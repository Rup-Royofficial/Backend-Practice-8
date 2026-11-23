const mongoose = require('mongoose')

const DBconnection = async() => {
    try {
        console.log('Trying to establish connection with database....')
        const connectionResponse = await mongoose.connect(process.env.MONGO_URI, { dbName: 'music-player' })
        console.log(`Connection established with database: ${connectionResponse.connection.host}`);
    } catch (error) {
        console.log(`Database connection failure: ${error.message}`)
        process.exit(1)
    }
}

module.exports = DBconnection