const jwt = require('jsonwebtoken')

const authUser = async(req,res,next) => {
    try{
        const token = req.cookies.token
        if(!token) return res.status(401).json({ message: "Unauthorized" })
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(decoded.role !== 'user') return res.status(403).json({ message: "User doesn't have the permissions" })
        
        req.user = decoded
        next()
    }catch(error){
        return res.status(404).json({ message: error.message })
    }
}

const authArtist = async(req,res,next) => {
    try{
        const token = req.cookies.token
        // console.log(token)
        if(!token) return res.status(401).json({ message: "Unauthorized" })
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // console.log(decoded);
        if(decoded.role !== 'artist') return res.status(403).json({ message: "User doesn't have the permissions" })
        
        req.user = decoded
        next()
    }catch(error){
        return res.status(404).json({ message: error.message })
    }
}

module.exports = { authUser, authArtist }